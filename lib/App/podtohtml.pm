package App::podtohtml;

# DATE
# VERSION

use 5.010001;
use strict;
use warnings;

our %SPEC;

$SPEC{podtohtml} = {
    v => 1.1,
    summary => 'Convert POD to HTML',
    description => <<'_',

This is a thin wrapper for <pm:Pod::Html> and an alternative CLI to
<prog:pod2html> to remove some annoyances that I experience with `pod2html`,
e.g. the default cache directory being `.` (so it leaves `.tmp` files around).
This CLI also offers tab completion.

It does not yet offer as many options as `pod2html`.

_
    args => {
        infile => {
            summary => 'Input file (POD)',
            description => <<'_',

If not found, will search in for .pod or .pm files in `@INC`.

_
            schema => 'perl::pod_or_pm_filename*',
            default => '-',
            pos => 0,
        },
        outfile => {
            schema => 'filename*',
            pos => 1,
        },
        browser => {
            summary => 'Instead of outputing HTML to STDOUT/file, '.
                'view it in browser',
            schema => ['bool*', is=>1],
        },
    },
    args_rels => {
        choose_one => [qw/outfile browser/],
    },
    examples => [
        {
            argv => [qw/some.pod/],
            summary => 'Convert POD file to HTML, print result to STDOUT',
            test => 0,
            'x.doc.show_result' => 0,
        },
        {
            argv => [qw/some.pod --browser/],
            summary => 'Convert POD file to HTML, show result in browser',
            test => 0,
            'x.doc.show_result' => 0,
        },
    ],
    'cmdline.skip_format' => 1,
};
sub podtohtml {
    require File::Temp;
    require Pod::Html;

    my %args = @_;

    my $infile  = $args{infile} // '-';
    my $outfile = $args{outfile} // '-';
    my $browser = $args{browser};

    my $cachedir = File::Temp::tempdir(CLEANUP => 1);

    my ($fh, $tempoutfile) = File::Temp::tempfile();

    unless (-f $infile) {
        return [404, "No such file '$infile'"];
    }

    Pod::Html::pod2html(
        ($infile eq '-' ? () : ("--infile=$infile")),
        "--outfile=$tempoutfile.html",
        "--cachedir=$cachedir",
    );

    if ($browser) {
        require Browser::Open;
        my $err = Browser::Open::open_browser("file:$tempoutfile.html");
        return [500, "Can't open browser"] if $err;
        [200];
    } elsif ($outfile eq '-') {
        local $/;
        open my $ofh, "<", "$tempoutfile.html";
        my $content = <$ofh>;
        [200, "OK", $content];
    } else {
        [200, "OK"];
    }
}

1;
# ABSTRACT:

=head1 SEE ALSO

L<pod2html>, L<Pod::Html>
