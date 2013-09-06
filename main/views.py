from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.shortcuts import render
from main.forms import NewGossipForm
from main.models import Gossip


def home(request):
    return render(request, "main/index.html")


def new_gossip(request):
    #return render(request, "main/new_gossip.html")
    if request.method == "POST":
        form = NewGossipForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = NewGossipForm()
    return render(request, "main/new_gossip.html", {"form": form})


def list_gossips(request):
    gossip_list = Gossip.objects.filter(is_active=1).all()
    paginator = Paginator(gossip_list, 25)  # Show 25 contacts per page
    page = request.GET.get('q')  #q=page
    try:
        gossips = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        gossips = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        gossips = paginator.page(paginator.num_pages)
    return render(request, "main/gossips.html", {'gossips':gossips})




