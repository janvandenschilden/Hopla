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


async function inputSampleID(wrapper, value){
    await wrapper.find('#input_sample_id').setValue(value);
};
async function inputGender(wrapper,value){
    await wrapper.findComponent({name:"InputGender"}).vm.$emit('input',value);
};
async function inputInformativeID(wrapper,boolean){
    await wrapper.find('#input_informative_id').setChecked(boolean);
};
async function inputAffected(wrapper,value){
    await wrapper.findComponent({name:"InputAffected"}).vm.$emit('input',value);
};
async function inputDpHardLimitID(wrapper,boolean){
    await wrapper.find('#input_dp_hard_limit_id').setChecked(boolean);
};
async function inputAfHardLimitID(wrapper,boolean){
    await wrapper.find('#input_af_hard_limit_id').setChecked(boolean);
};

class FatherInputs {
    constructor(params){
        this.sampleID = "defaultFatherID";
        this.gender = "M";
        this.keepInformativeIDs = true;
        this.diseaseStatus =  "NA";
        this.keepLimitIDHardDP =  true;
        this.keepLimitIDHardAF = true;
        for (let key in params) {
            this[key] = params[key];
        };
    };
}
export async function addFather(
        wrapper,
        params={},
){
    let Inputs = new FatherInputs(params);
    await wrapper.find('#tab_pedigree').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('#input_father_add').trigger('click');
    await wrapper.vm.$nextTick();

    // select father card element
    let fatherCardElm = await wrapper.find('#input_father_card');

    // fill in fields
    await inputSampleID(fatherCardElm, Inputs.sampleID);
    await inputGender(fatherCardElm, Inputs.gender);
    await inputInformativeID(fatherCardElm,Inputs.keepInformativeIDs);
    await inputAffected(fatherCardElm, Inputs.diseaseStatus);
    await inputDpHardLimitID(fatherCardElm, Inputs.keepLimitIDHardDP);
    await inputAfHardLimitID(fatherCardElm, Inputs.keepLimitIDHardAF);
    
    await wrapper.vm.$nextTick(); 
}