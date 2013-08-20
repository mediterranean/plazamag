from django import forms

class NewGossipForm(forms.Form):
    title = forms.CharField(max_length=100)
    explanation = forms.CharField(max_length=2500)
    #created_at = models.DateTimeField(auto_now_add=True)
    #good = models.IntegerField(default=0)
    #bad = models.IntegerField(default=0)
    company = forms.CharField()
    nickname = forms.CharField(max_length=100)
    age = forms.IntegerField(min_value=18)
    gender = forms.IntegerField()
    location = forms.CharField()
    #is_active =models.BooleanField(default=True)
