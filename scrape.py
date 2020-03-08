import requests
import lxml.html as lh
from bs4 import BeautifulSoup

number_of_articles = 10
URL = 'https://www.reuters.com/search/news?sortBy=date&dateRange=all&blob=coronavirus'
#creates handle / page to handle the content 
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')
table_soup = soup.find_all('h3', class_='search-result-title')

url_list = soup.select('.search-result a')
final_url = []

for x in table_soup:
    print(x.get_text())

for y in url_list:
    if "/article/id" in str(y):
        final_url.append("www.reuters.com" + y.get('href'))
    

for y in final_url:
    print(y)

   