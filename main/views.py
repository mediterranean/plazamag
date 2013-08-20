from django.shortcuts import render


def home(request):
    return render(request, "main/index.html")


def new_gossip(request):
    return render(request, "main/new_gossip.html")