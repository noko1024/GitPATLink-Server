import os

bind = '0.0.0.0:' + str(os.getenv('PORT', 9876))
proc_name = 'Infrastructure-Practice-Flask'
workers = 1

# Debugging
reload = True

# Logging
errorlog = "./logs/gunicorn_err.log"
loglevel = 'debug'
accesslog = '-'
logfile = "./logs/gunicorn.log"
logconfig = None

# Worker Processes
workers = 1