#Step 0: Importing packages

import requests

from bs4 import BeautifulSoup

url = "https://www.inshorts.com/en/read"

#Step 1: GET HTML using requests

r = requests.get(url)

content = r.content

#Step 2: Parsing HTML using BeautifulSoup

soup = BeautifulSoup(content,'html.parser')

#Step 3:  HTML Tree traversal 

all_news = soup.find_all('div',{'class':'news-card z-depth-1'})

for news in all_news:
    news_headlines = news.find('span',{'itemprop':'headline'}).text.strip()#Headline
    news_author = news.find('span',{'class':'author'}).text.strip()#Author
    news_body = news.find('div',{'itemprop':'articleBody'}).text.strip()#Body
    anchor = news.find_all('a',{'class':'source'})
    news_url = ''
    for link in anchor:
        if(link.get('href')!='#'):
            news_url = link.get('href')#News Source
    images = news.find_all('div',{'class':'news-card-image'})
    news_images = ''
    for im in images:
        news_images = im.get('style')[23:-3]#Image url
    news_headlines_1 = news_headlines.replace('.','').replace(',',"").split(' ')
    news_body_1 = news_body.replace('.',' ').replace(',',"").split(" ")
    max_occurance = []
    for i in news_headlines_1:
        if i not in ['a','an','the','in','is','of','on','to','for','after','I',"I'm",'be','he','she','they','him','her','are']:
            max_occurance.append(news_body_1.count(i))
        else:
            max_occurance.append(0)
    news_keyword = news_headlines_1[max_occurance.index(max(max_occurance))]# News Keyword
    print('Headlines: ',news_headlines,'.\n','Description: ',news_body,'\n','Keyword- ',news_keyword,'\n','Author- ',news_author,'\n','Source: ',news_url,'\n','Top Image link: ',news_images,'\n\n')
    
    

all_categories = soup.find_all('a')
print(" News Categories:\n")
for categories in all_categories:
    if(categories.get('href').startswith('/en/read/')):
        category_url = 'https://www.inshorts.com'+ categories.get('href')#Url for categories
        print(category_url)
