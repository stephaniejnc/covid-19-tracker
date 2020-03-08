import requests
import lxml.html as lh
from bs4 import BeautifulSoup
URL = 'https://www.reuters.com/search/news?sortBy=date&dateRange=all&blob=coronavirus'
#creates handle / page to handle the content 
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')
table_soup = soup.find_all('h3', class_='search-result-title')

url_list = soup.select('.search-result a')
final_url = []

for y in url_list:
    if "/article/id" in str(y):
        final_url.append("www.reuters.com" + y.get('href'))
    


URL_post = 'https://stephaniejnc.github.io/covid-19-tracker/'
post = BeautifulSoup(URL_post, 'html.parser')
data_loc = soup.find('h2', id='soup_data')

print(data_loc)


# Open index.html with Beautiful soup
# Select location in index.html
# Append final_url content into location