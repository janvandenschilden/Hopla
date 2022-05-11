export async function getConfigText(wrapperHoplaForm) {
    await wrapperHoplaForm.find('#tab_config').trigger('click');
    await wrapperHoplaForm.vm.$nextTick();
    return await wrapperHoplaForm.find('#config_text').text();
}

export function removeCommentsFromConfig(configText){
    return configText.replace(/#.*\n/g,'');
}

export const emptyConfigText=`# ------
# HEADER
# ------
# paternalGrandfather=U3
# paternalGrandmother=U4
# maternalGrandfather=U5
# maternalGrandmother=U6
# father=U1
# mother=U2
# siblings=
# embryos=
# -------------------
# MANDATORY ARGUMENTS
# -------------------
vcf.file=/path/to/file.vcf
sample.ids=
# ----------------------------
# IMPORTANT OPTIONAL ARGUMENTS
# ----------------------------
father.ids=
mother.ids=
genders=
cytoband.file=/home/projects/coPGT-M/ref/cytoBand_hg38.txt
# --------------------------------------------------------
# IMPORTANT OPTIONAL VARIANT INCLUSION ARGUMENTS: FILTER 1
# --------------------------------------------------------
dp.hard.limit.ids=
af.hard.limit.ids=
af.hard.limit=0.25
dp.soft.limit.ids=
# --------------------------------------------------------
# IMPORTANT OPTIONAL VARIANT INCLUSION ARGUMENTS: FILTER 2
# --------------------------------------------------------
keep.informative.ids=
keep.hetero.ids=
# -----------------------------------
# OPTIONAL: SAMPLE/DISEASE ANNOTATION
# -----------------------------------
regions=
reference.ids=
carrier.ids=
affected.ids=
nonaffected.ids=
start.info
Disease:
Inheritance:AD
Sequencing note:
end.info
# -------------------------------------
# OPTIONAL: B-ALLELE FREQUENCY PROFILES
# -------------------------------------
baf.ids=
# -------------------------
# OPTIONAL: Merlin Profiles
# -------------------------
window.size.voting=10000000
keep.chromosomes.only=T
keep.regions.only=F
# ----------------------------
# OPTIONAL: REMAINING FEATURES
# ----------------------------
fam.id=famID
limit.baf.to.P=F
limit.pm.to.P=T
value.of.P=0.15
self.contained=T
regions.flanking.size=1000000`;