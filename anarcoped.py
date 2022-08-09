from cgitb import text
import requests
from lxml import etree
from lxml.html import fromstring
from bs4 import BeautifulSoup



url="https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pubhtml?gid=453695488&single=true"
# html= requests.get(url).text

# url = 'http://microformats.org/'
content = requests.get(url).text
doc = fromstring(content)
doc.make_links_absolute(url)

soup = BeautifulSoup(content, 'lxml')
soup1 = soup.select('tr')
__import__('ipdb').set_trace()


# s = """<table>
#   <tr><th>Event</th><th>Start Date</th><th>End Date</th></tr>
#   <tr><td>a</td><td>b</td><td>c</td></tr>
#   <tr><td>d</td><td>e</td><td>f</td></tr>
#   <tr><td>g</td><td>h</td><td>i</td></tr>
# </table>
# """
# etree.fromstring(html)
table = doc.find("body/div/div/div/table")
rows = iter(table)
headers = [col.text for col in next(rows)]
for row in rows:
    values = [col.text for col in row]
    print (dict(zip(headers, values)))