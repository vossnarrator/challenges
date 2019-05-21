## McKay Tempus Challenge Dag README

### Setup

Set config variables, located in data-engineer-airflow-challenge/dags/config.py

Ideally, these variables would be set as environment variables, and not in 
plaintext config file, but this was easiest to setup and for others to get 
running.

### Solution
At a high level, the DAG is split into two tasks.  Creating the files to be 
uploaded, and then uploading each file.  

In the first task, we make a call to retrieve all sources.  Then for each 
source, we make a call to retrieve the top headlines.  There was the option to 
just make a call to directly retrieve the top headlines, but the NewsAPI has a
limitation on how many pages you can query and this is a way around it. 
Furthermore, if the number of sources grows too large, you might be able to 
parallelize this step into many subtasks, where you retrieve the top headlines 
for a source, and put that csv file into S3.  I actually went down this pathway
first, but after much research, and poor performance, I figured this wasn't the 
intended solution.  After the headlines are retrieved, a file is created in the
TMP directory.  This was designed this way, because of the way tasks (to my 
understanding) should be structured.  Each task should get the data, do 
something quick with it, and then get rid of it.  In this case, the file that
we wanted to upload to S3 was created

In the second task, we have all the files created.  Then, its a simple matter 
of ensuring the bucket we want is created, and uploading each file.  

A possible third task that could be implemented is a cleaup task.  Delete all
the files in the temp folder, as we don't need them anymore.  Otherwise, we
run the very valid risk of uploading headlines with sources that don't exist
anymore.


### Testing Notes

To touch on the methodology that I used for testing (as this would probably 
change given more exposure to DAG workflows), I opted for longest end-to-end
testing, patching external calls like newsapi calls, and file service calls.
It goes without saying that automated tests should never keep hitting external
sources.  And creating and deleting files is also bad practice and better left
patched.

An improvement (and I put other todos in the test file), is to auto patch boto
using conftest.  Instead of patching boto on every test, and maybe accidentally
forgetting about it in one test, it's safer to just patch that out.  I would
probably have done it if I had allotted more time to myself to work on the 
assignment more.


### Final notes

First, I've never seen type hinting in Python.  It's not something I learned
in university, nor something we do here at my current position.  However, given
more time, I'd definitely have went back and added it to all my funcitons.  I,
however, chose to do it for none of the functions, rather than for some of the
easier ones, for a more consistent code style.

Secondly, I have never used this type of system, but I have to say, it was 
entertaining getting my feet wet in Apache Airflow.  I have some ideas on how
I'd use it for my personal project.

Lastly, the litter of todos in the code are more of me being communicative
about what I'd do in the future, and less about me actually writing todos.  
They should be documented elsewhere