use strict;
# perl prog01.pl input01.txt
my $p;
my $nb;
foreach my $i (<>) {
    $nb++ if defined($p) and $i > $p;
    $p = $i;
}
print "$nb\n";
