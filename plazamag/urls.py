from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^$', 'main.views.home', name='home'),
    url(r'^yeni-dedikodu/$', 'main.views.new_gossip', name='new_gossip'),
)
