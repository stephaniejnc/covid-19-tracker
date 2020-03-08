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
url_list = url_list.get('href')


for x in table_soup:
    print(x.get_text())

for y in url_list:
    print(y.get('href'))


