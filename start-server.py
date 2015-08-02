#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import yaml

import tornado.ioloop
import tornado.web
from tornado.web import (
	StaticFileHandler,
	RequestHandler
)

fd = open('config.yaml', 'r')
config = yaml.load(''.join(fd.readlines()))
fd.close()

PORT = config['SERVER']['PORT']
HOST = config['SERVER']['HOST']


class MainHandler(RequestHandler):
	def get(self):
		self.render('public/index.html')


def make_app():
    return tornado.web.Application([
    	(r'/', MainHandler),
        (r'/(.*)', StaticFileHandler, { 'path': 'public' })
    ])

if __name__ == '__main__':
    app = make_app()
    app.listen(PORT, HOST)
    print('Server started http://%s:%d' % (HOST, PORT))
    tornado.ioloop.IOLoop.current().start()
