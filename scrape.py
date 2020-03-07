
import codecs

from urllib.request import urlopen

from bs4 import BeautifulSoup

import os

import hashlib

def slugify(s):

    #hd = hashlib.sha1(s.encode('utf-8')).hexdigest()

    hd = hashlib.md5(s.encode('utf-8'))

    r = str(hd.hexdigest())

    #hd = hash(s)

    return r


def html_load(url):

    print(&amp;quot;html_load &amp;quot;, url)

    dir_path = os.getcwd()

    cache_dir = os.path.join(dir_path, 'cache')

    if (not os.path.isdir(cache_dir)):

        os.makedirs(cache_dir)

    file_name = str(slugify(url)) + &amp;quot;.html&amp;quot;

    cache_file = os.path.join(cache_dir, file_name)


    html = ''

    if (not os.path.isfile(cache_file)):

        response = urlopen(url)

        data = response.read()

        html = data.decode('utf-8')

        print (&amp;quot;Saved to chache file: &amp;quot;, cache_file)

        f1 = codecs.open(cache_file, 'w', 'utf-8')

        f1.write(html)

        f1.close()

    else:

        print(&amp;quot;Data was taken from cache: &amp;quot;, cache_file)

        f = codecs.open(cache_file,'r', 'utf-8')

        html = f.read()

    return html


print('script started')

my_url = 'https://www.amazon.com/dp/B00OQVZDJM/'

html = html_load(my_url)

soup = BeautifulSoup(html, 'html.parser')

price_text = soup.find('span', attrs={'id':'priceblock_ourprice'})


print('price: ', price_text.text)

