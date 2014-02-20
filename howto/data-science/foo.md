# How-to

Looking for prescribing variation outliers can identify important
behaviours or changes in individual doctors or in areas of the
country. This tutorial walks through how to visualise this variation,
and how to make sure what you do is statistically sensible.

### Step one - what variation are you looking for?
In this tutorial, we show how to look at variation in diabetes
prescriptions across the country. We have data down to GP surgery
level, so we could look at this at surgery or CCG (area) level.

In this example, we want to see what impact a charity has had by
running local roadshows trying to persuade people to get diagnosed, so
we'll want to look for localised changes over time.


### Step two - get the data
In order to look at variation in diabetes prescribing, we'll need:

* A list of which prescribing items are used for diabetes
* The monthly prescribing files which show all items prescribed by all
  GP surgeries
* The diabetes prevalence in each area
* Map files showing where those surgeries are, so that we can locate
  them in relation to where the roadshows happened
  

We asked the charity what drugs were relevant, and they gave us the
following list: 

	ADD LIST HERE

EXPLAIN HOW WE GET THE DATA USING OHDP

### Step three - sense-check the data
It's extremely common for data to contain errors or faults. Therefore
we always try and check for anything obviously strange, using
histograms, averages, counts, and any other simple statistical
measures of the data that might confuse us later. 

In this case, we might check:

* how many GP surgeries are in our dataset?
* what's their total drugs spend (does it sound sensible?)
* what's the total spend on diabetes drugs?
* what's the highest and lowest spend?
* have we missed any obvious drugs? (e.g. search for "insulin" in the
  file to see if that picks up any new drugs names) 

### Step four - decide what we want to look at

#### Simple visualisation
Initially, it's probably useful to just visualise variation in
diabetes prevalence by CCG area.

EXPLAIN HOW TO DO THIS VIZ

#### Getting cleverer

We might also want to add the ability to 'drill down' into an area and
see areas of high prevalence, so that users can see where the biggest
problems are to address.

EXPLAIN HOW TO DO THIS VIZ WITH BAR CHARTS

#### Thinking about spending

We now want to start to bring in the prescribing data. We can start
out keeping it really simple, and looking at total spend per area.

But we know that some areas have more people than others; and also,
some populations have a higher incidence of diabetes than others. So
we really need to look at spending or prescribing _per diabetic_ to
make sure we're showing something useful.

	add code to calculate per head amounts
	
#### Visualise spending per head

	add code

#### Visualise changes over time

We know that the thing that's really interesting to our end user is
changes over time. So we'll add charts of spending per head over time
that they can use to look at changes.

We could go further and add statistical significance measures around
what changes are statistically meaningful, but that may get misleading
as there are so many variables here (what drugs we've chosen, what
influences selection of those drugs, how accurate the prevalence
measures are, and lots of other things) so in this case it makes sense
to leave the user to look at the charts and see whether they appear to
have made an impact.


### Step five - set up in a way that's helpful to the user

Now we've put together all the pieces, let's set it all up in a
website that allows them to: 

- start on a page that shows diabetes prevalence per area
- search for the postcode where they did a roadshow
- see a timeseries of the last 2 years' spending per head, with a line
  for each of the 10 nearest GP surgeries 

	add code
