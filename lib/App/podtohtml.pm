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

_
    args => {
        infile => {
            summary => 'Input file (POD)',
            description => <<'_',

If not found, will search in for .pod or .pm files in `@INC`.

_
            schema => 'str*', # XXX perl::modname | filename
            default => '-',
            pos => 0,
        },
        outfile => {
            schema => 'filename*',
            default => '-',
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
            argv => [qw/some.pod/],
            summary => 'Convert POD file to HTML, show result in browser',
            test => 0,
            'x.doc.show_result' => 0,
        },
    ],
};
sub podtohtml {
    require File::Temp;
    require Pod::Html;

    my %args = @_;

    my $infile  = $args{infile} // '-';
    my $outfile = $args{outfile} // '-';
    my $browser = $args{browser};

    my $cachedir = File::Temp::tempdir(CLEANUP => 1);

    my ($fh, $tempoutfile);
    if ($browser) {
        ($fh, $tempoutfile) = File::Temp::tempfile(
            "xxxxxxxx.html", DIR => $cachedir);
    }

    Pod::Html::pod2html(
        "pod2html",
        "--infile=$infile",
        "--outfile=$tempoutfile",
        "--cachedir=$cachedir",
    );

    if ($browser) {
        require Browser::Open;
        my $err = Browser::Open::open_browser("https://metacpan.org/author/$cpanid");
        return [500, "Can't open browser"] if $err;
        [200];
    } elsif ($outfile eq '-') {
        local $/;
        open my $ofh, "<", $tempoutfile;
        my $content = <$ofh>;
        [200, "OK", $content, {'cmdline.skip_format' => 1}];
    } else {
        [200, "OK"];
    }
}

1;
# ABSTRACT:

=head1 SEE ALSO

L<pod2html>, L<Pod::Html>
