CREATE TABLE Region (  
    regionID VARCHAR2(255) PRIMARY KEY NOT NULL,  
    regionName VARCHAR2(255)  
); 
 
 
CREATE TABLE Country (  
    countryID VARCHAR2(255) PRIMARY KEY NOT NULL,  
    regionID VARCHAR2(255) NOT NULL,  
    countryName VARCHAR2(255),  
    currencyUnit VARCHAR2(255)
); 
 
CREATE TABLE DevelopmentIndicator (  
    indicatorID VARCHAR2(255) PRIMARY KEY NOT NULL,
    indicatorName VARCHAR2(255),  
    topic VARCHAR2(255),  
    unitsOfMeasure VARCHAR2(255)
); 
 
CREATE TABLE PovertyAndIncome (
    indicatorID VARCHAR2(255) NOT NULL,  
    countryID VARCHAR2(255) NOT NULL,  
    year INTEGER NOT NULL,  
    watts INTEGER,  
    mean FLOAT,  
    gdp FLOAT,  
    giniIndex FLOAT,  
    median FLOAT,  
    povertyGap FLOAT,  
    headCount INTEGER,  
    PRIMARY KEY(indicatorID, countryID, year)
);

ALTER TABLE Country ADD CONSTRAINT FK_CountryREFRegion
  FOREIGN KEY (regionID) REFERENCES Region(regionID)
  INITIALLY DEFERRED DEFERRABLE;

ALTER TABLE PovertyAndIncome ADD CONSTRAINT FK_IndicatorREFCountry
    FOREIGN KEY (countryID) REFERENCES Country(countryID)
    INITIALLY DEFERRED DEFERRABLE;

ALTER TABLE PovertyAndIncome ADD CONSTRAINT FK_IndicatorREFIndicator
    FOREIGN KEY (indicatorID) REFERENCES DevelopmentIndicator(indicatorID)
    INITIALLY DEFERRED DEFERRABLE;
  
