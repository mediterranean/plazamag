from django.db import models


class Company(models.Model):
    name = models.TextField()
    logo = models.URLField(blank=True)
    url = models.URLField(blank=True)


class Gossip(models.Model):
    title = models.TextField()
    explanation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    good = models.IntegerField(default=0)
    bad = models.IntegerField(default=0)
    company = models.ForeignKey(Company)
    nickname = models.TextField(default="Anonim")
    age = models.IntegerField()
    gender = models.IntegerField()
    location = models.TextField()
    is_active = models.BooleanField(default=True)


class Reply(models.Model):
    gossip = models.ForeignKey(Gossip)
    explanation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    nickname = models.TextField(default="Anonim")
    age = models.IntegerField()
    gender = models.IntegerField()