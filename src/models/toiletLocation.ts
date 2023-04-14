// {"﻿OBJECTID":"1","DATASET_EN":"FEHD facility and service locations","DATASET_TC":"食物環境衞生署的設施及服務位置","NAME_EN":"Lan Kwai Fong Refuse Collection Point","ADDRESS_EN":"\"At side of Lan Kwai Fong Sitting-out area","NAME_TC":" Central\"","ADDRESS_TC":"蘭桂坊垃圾收集站","SEARCH01_EN":"中環蘭桂坊休憩處側","SEARCH01_TC":"CENTRAL AND WESTERN","SEARCH02_EN":"中西區","SEARCH02_TC":"PUBLIC REFUSE COLLECTION POINTS","NSEARCH01_EN":"公眾垃圾收集站","NSEARCH01_TC":"N.A.","NSEARCH02_EN":"N.A.","NSEARCH02_TC":"N.A.","NSEARCH03_EN":"N.A.","NSEARCH03_TC":"N.A.","NSEARCH04_EN":"N.A.","NSEARCH04_TC":"24 hours","NSEARCH05_EN":"二十四小時","NSEARCH05_TC":"158","NSEARCH06_EN":"158","NSEARCH06_TC":"2018/07/30","NORTHING":"2018/07/30","EASTING":"815777.7","LATITUDE":"834084.5","LONGITUDE":"22.280871","LASTUPDATE":"114.155687","GeometryEasting":"2023-03-14 17:08:02","GeometryNorthing\r":"834084.5"},{"﻿OBJECTID":"2","DATASET_EN":"FEHD facility and service locations","DATASET_TC":"食物環境衞生署的設施及服務位置","NAME_EN":"Hing Shing Road Refuse Collection Point","ADDRESS_EN":"\"No. 82 Hing Shing Road","NAME_TC":" Kwai Chung\"","ADDRESS_TC":"興盛路垃圾收集站","SEARCH01_EN":"葵涌興盛路82號","SEARCH01_TC":"KWAI TSING","SEARCH02_EN":"葵青區","SEARCH02_TC":"PUBLIC REFUSE COLLECTION POINTS","NSEARCH01_EN":"公眾垃圾收集站","NSEARCH01_TC":"N.A.","NSEARCH02_EN":"N.A.","NSEARCH02_TC":"N.A.","NSEARCH03_EN":"N.A.","NSEARCH03_TC":"N.A.","NSEARCH04_EN":"N.A.","NSEARCH04_TC":"7:00 am - 11:30 pm","NSEARCH05_EN":"上午七時至下午十一時半","NSEARCH05_TC":"281","NSEARCH06_EN":"281","NSEARCH06_TC":"2011/12/06","NORTHING":"2011/12/06","EASTING":"824551.8","LATITUDE":"830943.3","LONGITUDE":"22.3601","LASTUPDATE":"114.125178","GeometryEasting":"2023-03-14 17:08:02","GeometryNorthing\r":"830943.3000001907"},{"﻿OBJECTID":"3","DATASET_EN":"FEHD facility and service locations","DATASET_TC":"食物環境衞生署的設施及服務位置","NAME_EN":"Pai Min Kok Tsuen Public Toilet","ADDRESS_EN":"\"Pai Min Kok Village","NAME_TC":" Tsuen Wan\"","ADDRESS_TC":"排棉角村公廁","SEARCH01_EN":"荃灣排棉角村","SEARCH01_TC":"TSUEN WAN","SEARCH02_EN":"荃灣區","SEARCH02_TC":"PUBLIC TOILETS","NSEARCH01_EN":"公廁","NSEARCH01_TC":"N.A.","NSEARCH02_EN":"N.A.","NSEARCH02_TC":"N.A.","NSEARCH03_EN":"N.A.","NSEARCH03_TC":"N.A.","NSEARCH04_EN":"N.A.","NSEARCH04_TC":"24 hours","NSEARCH05_EN":"24 小時","NSEARCH05_TC":"508","NSEARCH06_EN":"508","NSEARCH06_TC":"2011/10/26","NORTHING":"2011/10/26","EASTING":"825138","LATITUDE":"823682","LONGITUDE":"22.365356","LASTUPDATE":"114.054675","GeometryEasting":"2023-03-14 17:08:02","GeometryNorthing\r":"823682"}
export type ToiletLocation = {
  OBJECTID: string;
  DATASET_EN: string;
  DATASET_TC: string;
  NAME_EN: string;
  ADDRESS_EN: string;
  NAME_TC: string;
  ADDRESS_TC: string;
  SEARCH01_EN: string;
  SEARCH01_TC: string;
  SEARCH02_EN: string;
  SEARCH02_TC: string;
  NSEARCH01_EN: string;
  NSEARCH01_TC: string;
  NSEARCH02_EN: string;
  NSEARCH02_TC: string;
  NSEARCH03_EN: string;
  NSEARCH03_TC: string;
  NSEARCH04_EN: string;
  NSEARCH04_TC: string;
  NSEARCH05_EN: string;
  NSEARCH05_TC: string;
  NSEARCH06_EN: string;
  NSEARCH06_TC: string;
  NORTHING: string;
  EASTING: string;
  LATITUDE: string;
  LONGITUDE: string;
  LASTUPDATE: string;
  GeometryEasting: string;
  GeometryNorthing: string;
};