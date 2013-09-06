from django import forms
from main.models import Company, Gossip


class NewGossipForm(forms.Form):
    title = forms.CharField(max_length=100)
    explanation = forms.CharField(max_length=2500)
    company = forms.CharField(label="Sirket")
    nickname = forms.CharField(max_length=100, required=False)
    age = forms.IntegerField(min_value=18)
    gender = forms.IntegerField(required=False)
    location = forms.CharField()

    def save(self):
        title = self.cleaned_data["title"]
        explanation = self.cleaned_data["explanation"]
        company = self.cleaned_data["company"]
        nickname = self.cleaned_data["nickname"]
        age = self.cleaned_data["age"]
        location = self.cleaned_data["location"]

        company, created = Company.objects.get_or_create(name=company)
        if created:
            company.save()

        gossip = Gossip(title=title, explanation=explanation, company=company,
                        age=age, location=location)
        gossip.save()