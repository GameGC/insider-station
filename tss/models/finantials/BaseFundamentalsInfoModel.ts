import { model, Schema, Document, Types } from 'mongoose';

export const DOCUMENT_NAME = 'FinantialsBase', COLLECTION_NAME = 'Finantials/Base';


//
// Interfaces
//

//main interface
export interface BaseFundamentalFinantialsInfo extends Document {
    id: Number,
    reports: [Report];
}

//
// Second interface
//
export interface Report extends Document {
    period: Date;
    bs: Bs;
    cf: Cf;
    ic: Ic;
}
//
// Third interfaces group
//
export interface Bs extends Document{
    CashAndCashEquivalentsAtCarryingValue: number;
    AccountsReceivableNetCurrent: number;
    InventoryNet: number;
    PrepaidExpenseAndOtherAssetsCurrent: number;
    AssetsCurrent: number;
    PropertyPlantAndEquipmentNet: number;
    OperatingLeaseRightOfUseAsset?: number;
    IntangibleAssetsNetExcludingGoodwill: number;
    Goodwill: number;
    OtherAssetsNoncurrent: number;
    Assets: number;
    AccountsPayableCurrent: number;
    AccruedAndOtherCurrentLiabilities?: number;
    ContractWithCustomerLiabilityCurrent?: number;
    CustomerDepositsLiabilitiesCurrent?: number;
    LongTermDebtAndFinanceLeasesCurrent?: number;
    LiabilitiesCurrent: number;
    LongTermDebtAndFinanceLeasesNoncurrent?: number;
    ContractWithCustomerLiabilityNoncurrent?: number;
    OtherLiabilitiesNoncurrent: number;
    Liabilities: number;
    CommitmentsAndContingencies: string;
    RedeemableNoncontrollingInterestEquityCarryingAmount: number;
    TemporaryEquityCarryingAmountAttributableToParent?: number;
    PreferredStockValue: string;
    CommonStockValue: number;
    AdditionalPaidInCapitalCommonStock: number;
    AccumulatedOtherComprehensiveIncomeLossNetOfTax: number;
    RetainedEarningsAccumulatedDeficit: number;
    StockholdersEquity: number;
    MinorityInterest: number;
    LiabilitiesAndStockholdersEquity: number;
    RestrictedCashCurrent?: number;
    LongTermAccountsNotesAndLoansReceivableNetNoncurrent?: number;
    RestrictedCashNoncurrent?: number;
    AccruedLiabilitiesCurrent?: number;
    ResaleValueGuaranteesCurrentPortion?: number;
    ResaleValueGuaranteesNoncurrentPortion?: number;
    RestrictedCashAndCashEquivalentsNoncurrent?: number;
    CustomerDepositsCurrent?: number;
    LongTermDebtAndCapitalLeaseObligationsCurrent?: number;
    LongTermDebtAndCapitalLeaseObligations?: number;
    ConvertibleSeniorNotesIssueToRelatedPartiesNonCurrent?: number;
    DueToRelatedPartiesCurrent?: number;
    DeferredRevenueCurrent?: number;
    DeferredRevenueNoncurrent?: number;
    RestrictedCashAndCashEquivalentsAtCarryingValue?: number;
}
export interface Cf extends Document{
    ProfitLoss: number;
    DepreciationAmortizationAndImpairment?: number;
    ShareBasedCompensation: number;
    AmortizationOfFinancingCostsAndDiscounts?: number;
    InventoryWriteDown: number;
    GainLossOnSaleOfPropertyPlantEquipment: number;
    ForeignCurrencyTransactionGainLossRealized?: number;
    NoncashInterestIncomeExpenseAndOtherOperatingActivities: number;
    IncreaseDecreaseInAccountsReceivable: number;
    IncreaseDecreaseInInventories?: number;
    IncreaseDecreaseInOperatingLeaseVehicles?: number;
    IncreaseDecreaseInPrepaidDeferredExpenseAndOtherAssets: number;
    IncreaseDecreaseInOtherNoncurrentAssets?: number;
    IncreaseDecreaseInAccountsPayableAndAccruedLiabilities: number;
    IncreaseDecreaseInContractWithCustomerLiability?: number;
    IncreaseDecreaseInContractWithCustomerLiabilityCustomerDeposits?: number;
    IncreaseDecreaseInOtherNoncurrentLiabilities: number;
    NetCashProvidedByUsedInOperatingActivities?: number;
    PaymentsToAcquirePropertyPlantAndEquipment: number;
    PaymentsForSolarEnergySystemsNetOfSales?: number;
    GovernmentGrantReceipt?: number;
    PaymentsToAcquireIntangibleAssets?: number;
    PaymentsToAcquireBusinessesNetOfCashAcquired?: number;
    NetCashProvidedByUsedInInvestingActivities?: number;
    ProceedsFromIssuanceOfCommonStock?: number;
    ProceedsFromConvertibleAndOtherDebt: number;
    RepaymentsOfConvertibleAndOtherDebt: number;
    ProceedsFromRepaymentsOfSecuredDebt?: number;
    ProceedsFromIssuanceOfSharesUnderIncentiveAndShareBasedCompensationPlansIncludingStockOptions: number;
    FinanceLeasePrincipalPayments?: number;
    PaymentsOfDebtIssuanceCosts?: number;
    ProceedsFromMinorityShareholders: number;
    PaymentsToMinorityShareholders: number;
    PaymentsForBuyOutsOfNoncontrollingInterestsInSubsidiaries?: number;
    NetCashProvidedByUsedInFinancingActivities?: number;
    EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsIncludingDisposalGroupAndDiscontinuedOperations?: number;
    CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect?: number;
    NoncashOrPartNoncashAcquisitionValueOfAssetsAcquired1: number;
    RightOfUseAssetObtainedInExchangeForFinanceLeaseLiability?: number;
    RightOfUseAssetObtainedInExchangeForOperatingLeaseLiability?: number;
    ForeignCurrencyTransactionGainLossBeforeTax?: number;
    OperatingCashFlowRelatedToRepaymentOfDiscountedConvertibleNotes?: number;
    IncreaseDecreaseInResaleValueGuarantee?: number;
    PaymentsForSolarEnergySystems?: number;
    PaymentsOfFinancingCosts?: number;
    PaymentsForHedgeFinancingActivities?: number;
    ProceedsFromIssuanceOfWarrants?: number;
    SharesIssuedInConnectionOfBusinessCombination?: number;
    IncreaseDecreaseInOtherOperatingAssetsAndNotesReceivables?: number;
    PaymentsForSolarEnergySystemsLeasedAndToBeLeased?: number;
    RepaymentsOfRelatedPartyDebt?: number;
    ProceedsFromRepaymentsOfLongTermDebtAndCapitalSecurities?: number;
    PaymentsForRepurchaseOfWarrants?: number;
    EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents?: number;
    NonCashEstimatedFairMarketValueOfManufacturingFacility?: number;
    IncreaseDecreaseInDeferredRevenue?: number;
    IncreaseDecreaseInDeferredRevenueAndCustomerAdvancesAndDeposits?: number;
    DepreciationAndAmortization?: number;
    NetCashProvidedByUsedInOperatingActivitiesContinuingOperations?: number;
    NetCashProvidedByUsedInInvestingActivitiesContinuingOperations?: number;
    NetCashProvidedByUsedInFinancingActivitiesContinuingOperations?: number;
    GainsLossOnAcquisition?: number;
    IncreaseDecreaseInRestrictedCash?: number;
    ProceedsFromSecuredNotesPayable?: number;
    ProceedsFromHedgeFinancingActivities?: number;
    EffectOfExchangeRateOnCashAndCashEquivalents?: number;
    CashAndCashEquivalentsPeriodIncreaseDecrease?: number;
    AmortizationOfDebtDiscountLessCapitalizedInterest?: number;
    IncreaseDecreaseInInventoriesAndPropertySubjectToOrAvailableForOperatingLease?: number;
    PaymentsForProceedsFromHedgeFinancingActivities?: number;
}
export interface Ic extends Document{
    OperatingLeasesIncomeStatementLeaseRevenue: number;
    SalesRevenueAutomotive: number;
    SalesRevenueServicesAndOtherNet: number;
    Revenues: number;
    CostOfAutomotiveLeasing: number;
    CostOfRevenuesAutomotive: number;
    CostOfServicesAndOther: number;
    CostOfRevenue: number;
    GrossProfit: number;
    ResearchAndDevelopmentExpense: number;
    SellingGeneralAndAdministrativeExpense: number;
    OperatingExpenses: number;
    OperatingIncomeLoss: number;
    InvestmentIncomeInterest: number;
    InterestExpense: number;
    OtherNonoperatingIncomeExpense: number;
    IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest: number;
    IncomeTaxExpenseBenefit: number;
    ProfitLoss: number;
    NetIncomeLossAttributableToNoncontrollingInterest: number;
    NetIncomeLoss: number;
    BuyOutOfNoncontrollingInterest?: number;
    NetIncomeLossAvailableToCommonStockholdersBasic?: number;
    EarningsPerShareBasic?: number;
    EarningsPerShareDiluted?: number;
    WeightedAverageNumberOfSharesOutstandingBasic?: number;
    WeightedAverageNumberOfDilutedSharesOutstanding?: number;
    OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax: number;
    ComprehensiveIncomeNetOfTaxIncludingPortionAttributableToNoncontrollingInterest?: number;
    ComprehensiveIncomeNetOfTaxAttributableToNoncontrollingInterest?: number;
    ComprehensiveIncomeNetOfTax: number;
    RestructuringAndOtherExpenses?: number;
    RevenueFromContractWithCustomerExcludingAssessedTax?: number;
    OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent?: number;
    SalesRevenueGoodsNet?: number;
    SalesRevenueEnergyServices?: number;
    CostOfGoodsSold?: number;
    CostOfServicesEnergyServices?: number;
    OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIOnDerivativesNetOfTax?: number;
    OtherComprehensiveIncomeLossDerivativesQualifyingAsHedgesNetOfTax?: number;
    EarningsPerShareBasicAndDiluted?: number;
    WeightedAverageNumberOfShareOutstandingBasicAndDiluted?: number;
}



//
// Schemas
//


const BS_Schema = new Schema({
    CashAndCashEquivalentsAtCarryingValue: Number,
    AccountsReceivableNetCurrent: Number,
    InventoryNet: Number,
    PrepaidExpenseAndOtherAssetsCurrent: Number,
    AssetsCurrent: Number,
    PropertyPlantAndEquipmentNet: Number,
    OperatingLeaseRightOfUseAsset: Number,
    IntangibleAssetsNetExcludingGoodwill: Number,
    Goodwill: Number,
    OtherAssetsNoncurrent: Number,
    Assets: Number,
    AccountsPayableCurrent: Number,
    AccruedAndOtherCurrentLiabilities: Number,
    ContractWithCustomerLiabilityCurrent: Number,
    CustomerDepositsLiabilitiesCurrent: Number,
    LongTermDebtAndFinanceLeasesCurrent: Number,
    LiabilitiesCurrent: Number,
    LongTermDebtAndFinanceLeasesNoncurrent:Number,
    ContractWithCustomerLiabilityNoncurrent:Number,
    OtherLiabilitiesNoncurrent: Number,
    Liabilities: Number,
    CommitmentsAndContingencies: String,
    RedeemableNoncontrollingInterestEquityCarryingAmount: Number,
    TemporaryEquityCarryingAmountAttributableToParent:Number,
    PreferredStockValue: String,
    CommonStockValue: Number,
    AdditionalPaidInCapitalCommonStock: Number,
    AccumulatedOtherComprehensiveIncomeLossNetOfTax: Number,
    RetainedEarningsAccumulatedDeficit: Number,
    StockholdersEquity: Number,
    MinorityInterest: Number,
    LiabilitiesAndStockholdersEquity: Number,
    RestrictedCashCurrent:Number,
    LongTermAccountsNotesAndLoansReceivableNetNoncurrent:Number,
    RestrictedCashNoncurrent:Number,
    AccruedLiabilitiesCurrent:Number,
    ResaleValueGuaranteesCurrentPortion:Number,
    ResaleValueGuaranteesNoncurrentPortion:Number,
    RestrictedCashAndCashEquivalentsNoncurrent:Number,
    CustomerDepositsCurrent:Number,
    LongTermDebtAndCapitalLeaseObligationsCurrent:Number,
    LongTermDebtAndCapitalLeaseObligations:Number,
    ConvertibleSeniorNotesIssueToRelatedPartiesNonCurrent:Number,
    DueToRelatedPartiesCurrent:Number,
    DeferredRevenueCurrent:Number,
    DeferredRevenueNoncurrent:Number,
    RestrictedCashAndCashEquivalentsAtCarryingValue:Number,
},{ versionKey: false, _id:undefined});
const CF_Schema = new Schema({
    ProfitLoss: Number,
    DepreciationAmortizationAndImpairment:Number,
    ShareBasedCompensation: Number,
    AmortizationOfFinancingCostsAndDiscounts:Number,
    InventoryWriteDown: Number,
    GainLossOnSaleOfPropertyPlantEquipment: Number,
    ForeignCurrencyTransactionGainLossRealized:Number,
    NoncashInterestIncomeExpenseAndOtherOperatingActivities: Number,
    IncreaseDecreaseInAccountsReceivable: Number,
    IncreaseDecreaseInInventories:Number,
    IncreaseDecreaseInOperatingLeaseVehicles:Number,
    IncreaseDecreaseInPrepaidDeferredExpenseAndOtherAssets: Number,
    IncreaseDecreaseInOtherNoncurrentAssets:Number,
    IncreaseDecreaseInAccountsPayableAndAccruedLiabilities: Number,
    IncreaseDecreaseInContractWithCustomerLiability:Number,
    IncreaseDecreaseInContractWithCustomerLiabilityCustomerDeposits:Number,
    IncreaseDecreaseInOtherNoncurrentLiabilities: Number,
    NetCashProvidedByUsedInOperatingActivities:Number,
    PaymentsToAcquirePropertyPlantAndEquipment: Number,
    PaymentsForSolarEnergySystemsNetOfSales:Number,
    GovernmentGrantReceipt:Number,
    PaymentsToAcquireIntangibleAssets:Number,
    PaymentsToAcquireBusinessesNetOfCashAcquired:Number,
    NetCashProvidedByUsedInInvestingActivities:Number,
    ProceedsFromIssuanceOfCommonStock:Number,
    ProceedsFromConvertibleAndOtherDebt: Number,
    RepaymentsOfConvertibleAndOtherDebt: Number,
    ProceedsFromRepaymentsOfSecuredDebt:Number,
    ProceedsFromIssuanceOfSharesUnderIncentiveAndShareBasedCompensationPlansIncludingStockOptions: Number,
    FinanceLeasePrincipalPayments:Number,
    PaymentsOfDebtIssuanceCosts:Number,
    ProceedsFromMinorityShareholders: Number,
    PaymentsToMinorityShareholders: Number,
    PaymentsForBuyOutsOfNoncontrollingInterestsInSubsidiaries:Number,
    NetCashProvidedByUsedInFinancingActivities:Number,
    EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsIncludingDisposalGroupAndDiscontinuedOperations:Number,
    CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect:Number,
    NoncashOrPartNoncashAcquisitionValueOfAssetsAcquired1: Number,
    RightOfUseAssetObtainedInExchangeForFinanceLeaseLiability:Number,
    RightOfUseAssetObtainedInExchangeForOperatingLeaseLiability:Number,
    ForeignCurrencyTransactionGainLossBeforeTax:Number,
    OperatingCashFlowRelatedToRepaymentOfDiscountedConvertibleNotes:Number,
    IncreaseDecreaseInResaleValueGuarantee:Number,
    PaymentsForSolarEnergySystems:Number,
    PaymentsOfFinancingCosts:Number,
    PaymentsForHedgeFinancingActivities:Number,
    ProceedsFromIssuanceOfWarrants:Number,
    SharesIssuedInConnectionOfBusinessCombination:Number,
    IncreaseDecreaseInOtherOperatingAssetsAndNotesReceivables:Number,
    PaymentsForSolarEnergySystemsLeasedAndToBeLeased:Number,
    RepaymentsOfRelatedPartyDebt:Number,
    ProceedsFromRepaymentsOfLongTermDebtAndCapitalSecurities:Number,
    PaymentsForRepurchaseOfWarrants:Number,
    EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents:Number,
    NonCashEstimatedFairMarketValueOfManufacturingFacility:Number,
    IncreaseDecreaseInDeferredRevenue:Number,
    IncreaseDecreaseInDeferredRevenueAndCustomerAdvancesAndDeposits:Number,
    DepreciationAndAmortization:Number,
    NetCashProvidedByUsedInOperatingActivitiesContinuingOperations:Number,
    NetCashProvidedByUsedInInvestingActivitiesContinuingOperations:Number,
    NetCashProvidedByUsedInFinancingActivitiesContinuingOperations:Number,
    GainsLossOnAcquisition:Number,
    IncreaseDecreaseInRestrictedCash:Number,
    ProceedsFromSecuredNotesPayable:Number,
    ProceedsFromHedgeFinancingActivities:Number,
    EffectOfExchangeRateOnCashAndCashEquivalents:Number,
    CashAndCashEquivalentsPeriodIncreaseDecrease:Number,
    AmortizationOfDebtDiscountLessCapitalizedInterest:Number,
    IncreaseDecreaseInInventoriesAndPropertySubjectToOrAvailableForOperatingLease:Number,
    PaymentsForProceedsFromHedgeFinancingActivities:Number,
},{ versionKey: false, _id:undefined});
const IC_Schema = new Schema({
    OperatingLeasesIncomeStatementLeaseRevenue: Number,
    SalesRevenueAutomotive: Number,
    SalesRevenueServicesAndOtherNet: Number,
    Revenues: Number,
    CostOfAutomotiveLeasing: Number,
    CostOfRevenuesAutomotive: Number,
    CostOfServicesAndOther: Number,
    CostOfRevenue: Number,
    GrossProfit: Number,
    ResearchAndDevelopmentExpense: Number,
    SellingGeneralAndAdministrativeExpense: Number,
    OperatingExpenses: Number,
    OperatingIncomeLoss: Number,
    InvestmentIncomeInterest: Number,
    InterestExpense: Number,
    OtherNonoperatingIncomeExpense: Number,
    IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest: Number,
    IncomeTaxExpenseBenefit: Number,
    ProfitLoss: Number,
    NetIncomeLossAttributableToNoncontrollingInterest: Number,
    NetIncomeLoss: Number,
    BuyOutOfNoncontrollingInterest:Number,
    NetIncomeLossAvailableToCommonStockholdersBasic:Number,
    EarningsPerShareBasic:Number,
    EarningsPerShareDiluted:Number,
    WeightedAverageNumberOfSharesOutstandingBasic:Number,
    WeightedAverageNumberOfDilutedSharesOutstanding:Number,
    OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax: Number,
    ComprehensiveIncomeNetOfTaxIncludingPortionAttributableToNoncontrollingInterest:Number,
    ComprehensiveIncomeNetOfTaxAttributableToNoncontrollingInterest:Number,
    ComprehensiveIncomeNetOfTax: Number,
    RestructuringAndOtherExpenses:Number,
    RevenueFromContractWithCustomerExcludingAssessedTax:Number,
    OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent:Number,
    SalesRevenueGoodsNet:Number,
    SalesRevenueEnergyServices:Number,
    CostOfGoodsSold:Number,
    CostOfServicesEnergyServices:Number,
    OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIOnDerivativesNetOfTax:Number,
    OtherComprehensiveIncomeLossDerivativesQualifyingAsHedgesNetOfTax:Number,
    EarningsPerShareBasicAndDiluted:Number,
    WeightedAverageNumberOfShareOutstandingBasicAndDiluted:Number,
},{ versionKey: false, _id:undefined});

const reportSchema = new Schema({
    period: Date,
    bs: BS_Schema,
    cf: CF_Schema,
    ic: IC_Schema,
},{ versionKey: false, _id:undefined});

const mainSchema = new Schema({
    _id: Number,
    reports:[reportSchema]
},{ versionKey: false });





export const BaseFundamentalFinantialsModel = model<BaseFundamentalFinantialsInfo>(DOCUMENT_NAME, mainSchema, COLLECTION_NAME);
export const BaseFundamentalFinantialsReportModel = model<Report>(DOCUMENT_NAME+"_Report", reportSchema);
export const BaseFundamentalFinantialsReportBSModel = model<Bs>(DOCUMENT_NAME+"_BS", BS_Schema);
export const BaseFundamentalFinantialsReportCFModel = model<Cf>(DOCUMENT_NAME+"_CF", CF_Schema);
export const BaseFundamentalFinantialsReportICModel = model<Ic>(DOCUMENT_NAME+"_IC", IC_Schema);


