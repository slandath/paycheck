const frequency = document.querySelector('#frequency');
const gross = document.querySelector('#earningGross');
const net = document.querySelector('#paycheckNet');
const jobs = document.querySelector('#jobs');
const w4 = document.querySelector('#w4Type');
const fedStatus = document.querySelector('#fedFiling');
const dependent = document.querySelector('#dependentAmount');
const otherIncome = document.querySelector('#otherIncomeAmount');
const fedTaxDeduction = document.querySelector('#deductionAmount');
const fedTaxAddWith = document.querySelector('#fedAddWithAmount');
const fedTax = document.querySelector('#fedTax');
const ssTax = document.querySelector('#ssTax');
const medTax = document.querySelector('#medTax');
const stateTax = document.querySelector('#stateTax');
const state = document.querySelector('#state');
const stateExemptions = document.querySelector('#stateExemptions');
const stateTaxAddWith = document.querySelector('#stateAddWithAmount');
const insurance = document.querySelector('#insurance');
const retirementTypePre = document.querySelector('#retirementTypePre');
const retirementAmountPre = document.querySelector('#retirementAmountPre');
const retirementTypePost = document.querySelector('#retirementTypePost');
const retirementAmountPost = document.querySelector('#retirementAmountPost');
const misc = document.querySelector('#misc');

// Event Listeners

const listeners = [
  frequency,
  gross,
  net,
  w4,
  fedStatus,
  dependent,
  otherIncome,
  fedTaxDeduction,
  fedTaxAddWith,
  state,
  stateExemptions,
  stateTaxAddWith,
  insurance,
  retirementTypePre,
  retirementAmountPre,
  retirementTypePost,
  retirementAmountPost,
  misc,
];

listeners.forEach((listener) => {
  addEventListener('input', calc);
});

// Main Function

function calc() {
  const paycheck = {
    frequency: +frequency.value,
    gross: +gross.value,
    insuranceAmount: +insurance.value,
    retirementTypePre: retirementTypePre.value,
    retirementAmountPre: +retirementAmountPre.value,
    retirementTypePost: retirementTypePost.value,
    retirementAmountPost: +retirementAmountPost.value,
    misc: +misc.value,
    w4: w4.value,
    fedFiling: fedStatus.value,
    dependentAmount: +dependent.value,
    otherIncomeAmount: +otherIncome.value,
    fedDeductionAmount: +fedTaxDeduction.value,
    fedAdditionalWithholdingAmount: +fedTaxAddWith.value,
    state: state.value,
    stateExemptions: +stateExemptions.value,
    stateAdditionalWithholdingAmount: +stateTaxAddWith.value,
  };

  // Retirement Totals

  let retirementTotalPre = 0;

  if (paycheck.retirementTypePre === 'percent') {
    retirementTotalPre = paycheck.gross * (paycheck.retirementAmountPre * 0.01);
  } else {
    retirementTotalPre = paycheck.retirementAmountPre;
  }

  let retirementTotalPost = 0;

  paycheck.retirementTypePost === 'percent'
    ? (retirementTotalPost =
        paycheck.gross * (paycheck.retirementAmountPost * 0.01))
    : (retirementTotalPost = paycheck.retirementAmountPost);

  const incomeTaxableTotal =
    paycheck.gross - (paycheck.insuranceAmount + retirementTotalPre);
  const nonIncomeTaxableTotal = paycheck.gross - paycheck.insuranceAmount;

  // Federal Taxes

  let taxTable;

  switch (true) {
    case fedFiling.value === 'single' && jobs.checked === true:
      taxTable = {
        tierOne: [0, 6925, 0, 0, 0],
        tierTwo: [6925, 12425, 0, 0.1, 6925],
        tierThree: [12425, 29288, 550, 0.12, 12425],
        tierFour: [29288, 54613, 2573.5, 0.22, 29288],
        tierFive: [54613, 97975, 8145, 0.24, 54613],
        tierSix: [97975, 122550, 18552, 0.32, 97975],
        tierSeven: [122550, 295988, 26416, 0.35, 122550],
        tierEight: [295988, 0, 87119.13, 0.37, 295988],
      };
      break;
    case fedFiling.value === 'married' && jobs.checked === true:
      taxTable = {
        tierOne: [0, 13850, 0, 0, 0],
        tierTwo: [13850, 24850, 0, 0.1, 13850],
        tierThree: [24850, 58575, 1100, 0.12, 24850],
        tierFour: [58575, 109225, 5147, 0.22, 58575],
        tierFive: [109225, 195950, 16290, 0.24, 109225],
        tierSix: [195950, 245100, 37104, 0.32, 195950],
        tierSeven: [245100, 360725, 52832, 0.35, 245100],
        tierEight: [360725, 0, 93300.75, 0.37, 360725],
      };
      break;
    case fedFiling.value === 'house' && jobs.checked === true:
      taxTable = {
        tierOne: [0, 10400, 0, 0, 0],
        tierTwo: [10400, 18250, 0, 0.1, 10400],
        tierThree: [18250, 40325, 785, 0.12, 18250],
        tierFour: [40325, 58075, 3434, 0.22, 40325],
        tierFive: [58075, 101450, 7339, 0.24, 58075],
        tierSix: [101450, 126025, 17749, 0.32, 101450],
        tierSeven: [126025, 299450, 25613, 0.35, 126025],
        tierEight: [299450, 0, 86311.75, 0.37, 299450],
      };
      break;
    case fedFiling.value === 'single':
      taxTable = {
        tierOne: [0, 5250, 0, 0, 0],
        tierTwo: [5250, 16250, 0, 0.1, 5250],
        tierThree: [16250, 49975, 1100, 0.12, 16250],
        tierFour: [49975, 100625, 5147, 0.22, 49975],
        tierFive: [100625, 187350, 16290, 0.24, 100625],
        tierSix: [187350, 236500, 37104, 0.32, 187350],
        tierSeven: [236500, 583375, 52832, 0.35, 236500],
        tierEight: [583375, 0, 174238.25, 0.37, 583375],
      };
      break;
    case fedFiling.value === 'married':
      taxTable = {
        tierOne: [0, 14800, 0, 0, 0],
        tierTwo: [14800, 36800, 0, 0.1, 14800],
        tierThree: [36800, 104250, 2200, 0.12, 36800],
        tierFour: [104250, 205550, 10294, 0.22, 104250],
        tierFive: [205550, 379000, 32580, 0.24, 205550],
        tierSix: [379000, 477300, 74208, 0.32, 379000],
        tierSeven: [477300, 708550, 105664, 0.35, 477300],
        tierEight: [708550, 0, 186601.5, 0.37, 708550],
      };
      break;
    case fedFiling.value === 'house':
      taxTable = {
        tierOne: [0, 12200, 0, 0, 0],
        tierTwo: [12200, 27900, 0, 0.1, 12200],
        tierThree: [27900, 72050, 1570, 0.12, 27900],
        tierFour: [72050, 107550, 6868, 0.22, 72050],
        tierFive: [107550, 194300, 14678, 0.24, 107550],
        tierSix: [194300, 243450, 35498, 0.32, 194300],
        tierSeven: [243450, 590300, 51226, 0.35, 243450],
        tierEight: [590300, 0, 172623.5, 0.37, 590300],
      };
      break;
  }

  const adjustedAnnualWage =
    incomeTaxableTotal * paycheck.frequency +
    paycheck.otherIncomeAmount -
    (paycheck.fedDeductionAmount +
      (jobs.checked === true
        ? 0
        : paycheck.fedFiling === 'married'
        ? 12900
        : 8600));

  let twoB;
  let twoC;
  let twoD;

  switch (true) {
    case adjustedAnnualWage > taxTable.tierOne[0] &&
      adjustedAnnualWage <= taxTable.tierOne[1]:
      twoB = taxTable.tierOne[0];
      twoC = taxTable.tierOne[2];
      twoD = taxTable.tierOne[3];
      break;
    case adjustedAnnualWage > taxTable.tierTwo[0] &&
      adjustedAnnualWage <= taxTable.tierTwo[1]:
      twoB = taxTable.tierTwo[0];
      twoC = taxTable.tierTwo[2];
      twoD = taxTable.tierTwo[3];
      break;
    case adjustedAnnualWage > taxTable.tierThree[0] &&
      adjustedAnnualWage <= taxTable.tierThree[1]:
      twoB = taxTable.tierThree[0];
      twoC = taxTable.tierThree[2];
      twoD = taxTable.tierThree[3];
      break;
    case adjustedAnnualWage > taxTable.tierFour[0] &&
      adjustedAnnualWage <= taxTable.tierFour[1]:
      twoB = taxTable.tierFour[0];
      twoC = taxTable.tierFour[2];
      twoD = taxTable.tierFour[3];
      break;
    case adjustedAnnualWage > taxTable.tierFive[0] &&
      adjustedAnnualWage <= taxTable.tierFive[1]:
      twoB = taxTable.tierFive[0];
      twoC = taxTable.tierFive[2];
      twoD = taxTable.tierFive[3];
      break;
    case adjustedAnnualWage > taxTable.tierSix[0] &&
      adjustedAnnualWage <= taxTable.tierSix[1]:
      twoB = taxTable.tierSix[0];
      twoC = taxTable.tierSix[2];
      twoD = taxTable.tierSix[3];
      break;
    case adjustedAnnualWage > taxTable.tierSeven[0] &&
      adjustedAnnualWage <= taxTable.tierSeven[1]:
      twoB = taxTable.tierSeven[0];
      twoC = taxTable.tierSeven[2];
      twoD = taxTable.tierSeven[3];
      break;
    case adjustedAnnualWage > taxTable.tierEight[0] &&
      adjustedAnnualWage <= taxTable.tierEight[1]:
      twoB = taxTable.tierEight[0];
      twoC = taxTable.tierEight[2];
      twoD = taxTable.tierEight[3];
      break;
  }

  const finalWithhold = Math.max(
    ((adjustedAnnualWage - twoB) * twoD + twoC) / paycheck.frequency -
      paycheck.dependentAmount / paycheck.frequency,
    0
  );

  let federalTax =
    Math.round(
      (paycheck.fedAdditionalWithholdingAmount + finalWithhold) * 100
    ) / 100;
  federalTax = federalTax < 0 ? 0 : federalTax;
  const oasdiTax = Math.round(nonIncomeTaxableTotal * 0.062 * 100) / 100;
  const medicareTax = Math.round(nonIncomeTaxableTotal * 0.0145 * 100) / 100;

  // State Income Tax

  const stateIncomeTax =
    Math.round(
      (incomeTaxableTotal -
        (paycheck.stateExemptions * 5400) / paycheck.frequency) *
        0.0405 *
        100
    ) / 100;

  fedTax.innerText = `$ ${federalTax}`;

  ssTax.innerText = `$ ${oasdiTax}`;

  medTax.innerText = `$ ${medicareTax}`;

  stateTax.innerText = `$ ${stateIncomeTax}`;

  const netAmount =
    Math.round(
      (incomeTaxableTotal -
        (retirementTotalPost +
          paycheck.misc +
          federalTax +
          oasdiTax +
          medicareTax +
          stateIncomeTax)) *
        100
    ) / 100;

  net.innerText = `$ ${netAmount}`;
}
