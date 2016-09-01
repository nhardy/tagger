#!/usr/bin/env python3

import json
import urllib.request


from pyproj import Proj, transform

def to_latlon(x, y):
  inProj = Proj(init='epsg:3857')
  outProj = Proj(init='epsg:4326')
  return transform(inProj, outProj, x, y)

ENDPOINT = 'http://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_POI/MapServer/0/{}?f=pjson'

with open('places.json', 'w') as f:
  f.write('[\n')
  for i in range(1, 135861):
    response = urllib.request.urlopen(ENDPOINT.format(i))

    print(i)

    obj = json.loads(response.read().decode('utf8'))

    lat, lon = to_latlon(obj['feature']['geometry']['x'], obj['feature']['geometry']['y'])

    if i != '1':
      f.write(',\n')

    f.write(json.dumps({
      'id': obj['feature']['attributes']['objectid'],
      'name': obj['feature']['attributes']['poiname'],
      'lat': lat,
      'lon': lon,
      'posts': [],
    }, sort_keys=True, indent=2))


  f.write('\n]')
