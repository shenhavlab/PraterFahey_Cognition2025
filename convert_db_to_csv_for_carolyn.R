# install.packages(c('RSQLite', 'jsonlite','plyr'))

library(RSQLite) # to connect to the db
library(jsonlite) # for converting json to dataframes
library(plyr) # for ldply()

rm(list = ls())

participantsDBPath <- "~/Dropbox (Brown)/ShenhavLab/Experiments/FXC_Web/participants.db"
outCSVPath <- "~/Dropbox (Brown)/ShenhavLab/Experiments/FXC_Web/data101617.csv"

db <- dbConnect(SQLite(), dbname=participantsDBPath)
tableDump <- dbReadTable(db, "turkdemo")

# tableDump[tableDump$workerId=="A2Q1YS118AO2BP",]$platform
# tableDump[tableDump$workerId=="A2Q1YS118AO2BP",]$browser

dstrings <- strsplit(tableDump$datastring[tableDump$codeversion=="1.0"], "\n") # now each string is a json object
dstrings <- dstrings[!is.na(dstrings)]

# to view contents
# td = fromJSON(dstrings[[1]]) # subject 1
# can list all the stuff inside td
# td$workerId, td$bonus, td$questiondata, td$data$dateTime

extractData <- function(json){
    x <- fromJSON(json)
    # now x is a nested list:
    # top level info is assignment ID, worker ID, hit ID etc
    # $data is recorded at the trial level automatically (time, trial ID, etc)
    # $data$trialdata is what you record with psiturk js calls (1obs/trial usually)
    # $questiondata is what you record with unstructured data record calls (1obs/subject usually)
    # $eventdata holds automatically tracked things like window resizes and focus (1obs/timestamp, does not align with trial/subject)
    ##
    # Transform dots vectors into strings
    data <- x$data$trialdata # this is what I wanted to record
    data <- cbind(data, uniqueid=x$data$uniqueid) # add unique ID
    data <- cbind(data, dateTime=x$data$dateTime) # this might be useful
    # next I grab everything I need from the nested lists,
    # x$age <- x$questiondata$age
    # x$gender <- x$questiondata$gender
    # next, I zero out the nested lists so I can bind the toplevel worker ID etc to my recorded data
    x$data <- NULL
    x$eventdata <- NULL
    x$questiondata <- NULL
    data <- cbind(data, data.frame(x)) # now merge into a table
    return(data)
}

trialdata <- ldply(dstrings, extractData) # l(ist)->d(ataframe)ply means apply function to each item in the list dstrings, then combine results into a data frame

# trialdata <- trialdata[!grepl("debug", trialdata$workerId),]  # remove testing

write.csv(trialdata, outCSVPath, row.names=F)
