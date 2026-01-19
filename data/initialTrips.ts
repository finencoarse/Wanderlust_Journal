
import { Trip, Language } from '../types';

export const getInitialTrips = (language: Language): Trip[] => {
  const isZh = language === 'zh-TW';
  const isJa = language === 'ja';
  const isKo = language === 'ko';

  const t1 = {
    title: isZh ? '京都之秋' : isJa ? '京都の秋' : isKo ? '교토의 가을' : 'Autumn in Kyoto',
    location: isZh ? '日本京都' : isJa ? '京都、日本' : isKo ? '일본 교토' : 'Kyoto, Japan',
    description: isZh 
      ? '漫步於金色的寺廟與楓葉覆蓋的山丘。體驗紅葉（Koyo）的魔力與傳統懷石料理。' 
      : isJa 
      ? '京都の金色の寺院と紅葉に覆われた丘を巡る静かな散歩。紅葉の魔法と伝統的な懐石料理を体験してください。' 
      : isKo 
      ? '교토의 금빛 사원과 단풍으로 뒤덮인 언덕을 거니는 고요한 산책. 코요(단풍)의 마법과 전통 가이세키 요리를 경험하세요.' 
      : 'A serene walk through the golden temples and maple-covered hills of Kyoto. Experience the magic of Koyo (autumn colors) and traditional Kaiseki dining.',
    flightDep: {
      transport: isZh ? 'Haruka 特急前往京都站' : isJa ? '関空特急はるかで京都駅へ' : isKo ? '교토역행 하루카 특급 열차' : 'Haruka Express Train to Kyoto Station'
    },
    flightRet: {
      transport: isZh ? 'MK 出租車從飯店接送' : isJa ? 'ホテルからMKタクシーシャトル' : isKo ? '호텔에서 출발하는 MK 택시 셔틀' : 'MK Taxi Shuttle from Hotel'
    },
    photos: {
      p10: isZh ? '抵達關西！' : isJa ? '関西に到着！' : isKo ? '간사이 도착!' : 'Touchdown at Kansai!',
      p11: isZh ? '伏見稻荷無盡的鳥居' : isJa ? '伏見稲荷の終わりのない鳥居' : isKo ? '후시미 이나리의 끝없는 도리이' : 'The endless gates of Fushimi Inari',
      p1: isZh ? '金閣寺在池中的倒影' : isJa ? '池に映る金閣寺' : isKo ? '연못에 비친 금각사' : 'Kinkaku-ji reflecting in the pond',
      p2: isZh ? '嵐山竹林清晨' : isJa ? '嵐山の竹林の早朝' : isKo ? '아라시야마 대나무 숲의 이른 아침' : 'Arashiyama Bamboo Forest early morning',
      p14: isZh ? '清水寺的塔景' : isJa ? '清水寺からの塔の眺め' : isKo ? '기요미즈데라의 탑 풍경' : 'Pagoda views at Kiyomizu-dera',
      p15: isZh ? '祇園區的夜景' : isJa ? '祇園の夜景' : isKo ? '기온 거리의 야경' : 'Night lights in Gion district',
      p16: isZh ? '哲學之道的寧靜' : isJa ? '哲学の道の静けさ' : isKo ? '철학의 길의 평온함' : 'Philosopher\'s Path serenity',
      p17: isZh ? '奈良友善的小鹿' : isJa ? '奈良の友好的な鹿' : isKo ? '나라의 친근한 사슴' : 'The friendly deer of Nara',
      p18: isZh ? '二條城鶯聲地板' : isJa ? '二条城の鴬張り' : isKo ? '니조성 꾀꼬리 마루' : 'Nijo Castle Nightingale Floors',
      p19: isZh ? '先斗町懷石料理晚餐' : isJa ? '先斗町での懐石料理' : isKo ? '폰토초 가이세키 저녁 식사' : 'Kaiseki dinner in Pontocho',
      p20: isZh ? '告別京都塔' : isJa ? '京都タワーとの別れ' : isKo ? '교토 타워 작별' : 'Kyoto Tower farewell',
    },
    comments: {
      c1: isZh ? '這是我度過最放鬆的一次旅行。' : isJa ? '今までで一番リラックスできた旅行でした。' : isKo ? '지금까지 중 가장 편안한 여행이었습니다.' : 'This was the most relaxing trip I have ever had.'
    },
    itinerary: {
      ev1: { title: isZh ? 'Haruka 特急' : isJa ? 'はるか特急' : isKo ? '하루카 특급' : 'Haruka Express', desc: isZh ? '乘坐特急列車從關西機場前往京都站。' : isJa ? '関空から京都駅までの特急列車。' : isKo ? '간사이 공항에서 교토역까지 특급 열차 탑승.' : 'Take the limited express from KIX to Kyoto Station.' },
      ev2: { title: isZh ? '錦市場晚餐' : isJa ? '錦市場の夕食' : isKo ? '니시키 시장 저녁' : 'Nishiki Market Dinner', desc: isZh ? '初嚐當地街頭美食與新鮮海鮮。' : isJa ? '地元の屋台料理と新鮮な魚介類を味わう。' : isKo ? '현지 길거리 음식과 신선한 해산물 맛보기.' : 'First taste of local street food and fresh seafood.' },
      ev3: { title: isZh ? '伏見稻荷大社' : isJa ? '伏見稲荷大社' : isKo ? '후시미 이나리 신사' : 'Fushimi Inari Shrine', desc: isZh ? '清晨徒步穿越千本鳥居以避開人潮。' : isJa ? '人混みを避けて千本鳥居を早朝ハイキング。' : isKo ? '인파를 피해 이른 아침 10,000개의 도리이 터널 하이킹.' : 'Early morning hike to avoid the crowds through the 10,000 torii gates.' },
      ev4: { title: isZh ? '東福寺' : isJa ? '東福寺' : isKo ? '도후쿠지' : 'Tofuku-ji Temple', desc: isZh ? '欣賞著名的通天橋紅葉。' : isJa ? '有名な通天橋の紅葉を鑑賞。' : isKo ? '유명한 츠텐교 단풍 감상.' : 'Viewing the famous Tsutenkyo Bridge autumn foliage.' },
      ev5: { title: isZh ? '金閣寺' : isJa ? '金閣寺' : isKo ? '금각사' : 'Kinkaku-ji', desc: isZh ? '晨光中的金色樓閣。' : isJa ? '朝の光に輝く金閣。' : isKo ? '아침 햇살 속의 금빛 누각.' : 'The Golden Pavilion in the morning light.' },
      ev6: { title: isZh ? '龍安寺' : isJa ? '龍安寺' : isKo ? '료안지' : 'Ryoan-ji', desc: isZh ? '在著名的石庭冥想。' : isJa ? '有名な石庭で瞑想。' : isKo ? '유명한 석정에서 명상.' : 'Meditating at the famous rock garden.' },
      ev7: { title: isZh ? '嵐山竹林' : isJa ? '嵐山の竹林' : isKo ? '아라시야마 대나무 숲' : 'Arashiyama Bamboo Grove', desc: isZh ? '漫步竹林並參觀天龍寺。' : isJa ? '竹林を散策し、天龍寺を訪問。' : isKo ? '대나무 숲 산책 및 텐류지 방문.' : 'Walk through the bamboo forest and visit Tenryu-ji.' },
      ev8: { title: isZh ? '湯豆腐午餐' : isJa ? '湯豆腐ランチ' : isKo ? '유도후 점심' : 'Yudofu Lunch', desc: isZh ? '嵐山傳統的湯豆腐料理。' : isJa ? '嵐山の伝統的な湯豆腐料理。' : isKo ? '아라시야마의 전통 두부 요리.' : 'Traditional boiled tofu specialty in Arashiyama.' },
      ev9: { title: isZh ? '清水寺' : isJa ? '清水寺' : isKo ? '기요미즈데라' : 'Kiyomizu-dera', desc: isZh ? '從木造舞台俯瞰城市的日落美景。' : isJa ? '木の舞台から街を見下ろす夕日。' : isKo ? '목조 무대에서 바라보는 도시의 일몰.' : 'Sunset views from the wooden stage over the city.' },
      ev10: { title: isZh ? '三年坂散步' : isJa ? '三年坂散策' : isKo ? '산넨자카 산책' : 'Sannenzaka Stroll', desc: isZh ? '購買紀念品與體驗傳統茶屋。' : isJa ? 'お土産の買い物と伝統的な茶屋。' : isKo ? '기념품 쇼핑과 전통 찻집.' : 'Souvenir shopping and traditional tea houses.' },
      ev11: { title: isZh ? '八坂神社' : isJa ? '八坂神社' : isKo ? '야사카 신사' : 'Yasaka Shrine', desc: isZh ? '探索祇園區的中心。' : isJa ? '祇園の中心地を探索。' : isKo ? '기온 거리의 중심 탐방.' : 'Exploring the heart of Gion district.' },
      ev12: { title: isZh ? '花見小路散步' : isJa ? '花見小路散策' : isKo ? '하나미코지 산책' : 'Geisha District Walk', desc: isZh ? '希望能一瞥藝妓或舞妓的風采。' : isJa ? '芸妓や舞妓の姿を一目見ようと散策。' : isKo ? '게이코나 마이코를 볼 수 있기를 기대하며.' : 'Hoping to catch a glimpse of a Geiko or Maiko.' },
      ev13: { title: isZh ? '銀閣寺' : isJa ? '銀閣寺' : isKo ? '은각사' : 'Ginkaku-ji', desc: isZh ? '銀閣與其壯觀的沙庭。' : isJa ? '銀閣と見事な砂庭。' : isKo ? '은각과 웅장한 모래 정원.' : 'The Silver Pavilion and its magnificent sand garden.' },
      ev14: { title: isZh ? '哲學之道' : isJa ? '哲学の道' : isKo ? '철학의 길' : 'Philosopher\'s Path', desc: isZh ? '沿著運河的風景優美步道。' : isJa ? '運河沿いの風光明媚な散歩道。' : isKo ? '운하를 따라 걷는 경치 좋은 산책로.' : 'A scenic walk along the canal.' },
      ev15: { title: isZh ? '奈良一日遊' : isJa ? '奈良日帰り旅行' : isKo ? '나라 당일치기' : 'Day Trip to Nara', desc: isZh ? '參觀東大寺（大佛）並餵食小鹿。' : isJa ? '東大寺（大仏）を訪れ、鹿に餌をやる。' : isKo ? '도다이지(대불) 방문 및 사슴 먹이 주기.' : 'Visiting Todai-ji (Great Buddha) and feeding deer.' },
      ev16: { title: isZh ? '二條城' : isJa ? '二条城' : isKo ? '니조성' : 'Nijo Castle', desc: isZh ? '將軍的居所與鶯聲地板。' : isJa ? '将軍の居城と鴬張り。' : isKo ? '쇼군의 거처와 꾀꼬리 마루.' : 'The residence of the Shogun with nightingale floors.' },
      ev17: { title: isZh ? '京都御所' : isJa ? '京都御所' : isKo ? '교토 고쇼' : 'Kyoto Imperial Palace', desc: isZh ? '漫步於廣闊的公園腹地。' : isJa ? '広大な公園の敷地を散策。' : isKo ? '광활한 공원 부지 산책.' : 'Strolling through the vast park grounds.' },
      ev18: { title: isZh ? '四條通' : isJa ? '四条通' : isKo ? '시조 거리' : 'Shijo-Dori', desc: isZh ? '最後採購日本工藝品與時尚商品。' : isJa ? '日本の工芸品やファッションの最後の買い物。' : isKo ? '일본 공예품과 패션을 위한 마지막 쇼핑.' : 'Final shopping for Japanese crafts and fashion.' },
      ev19: { title: isZh ? '懷石料理告別晚餐' : isJa ? '懐石料理の送別夕食' : isKo ? '가이세키 송별 만찬' : 'Kaiseki Farewell Dinner', desc: isZh ? '在河畔旅館享用傳統多道式宴席。' : isJa ? '川沿いの旅館での伝統的なコース料理。' : isKo ? '강변 료칸에서의 전통 코스 요리.' : 'A multi-course traditional banquet at a riverside ryokan.' },
      ev20: { title: isZh ? '返回關西機場' : isJa ? '関空へ戻る' : isKo ? '간사이 공항 복귀' : 'Return to KIX', desc: isZh ? 'MK 出租車從飯店大廳接送。' : isJa ? 'ホテルのロビーからMKタクシーシャトルで。' : isKo ? '호텔 로비에서 MK 택시 셔틀 탑승.' : 'MK Taxi shuttle picking up from the hotel lobby.' }
    }
  };

  const t2 = {
    title: isZh ? '大阪與韓國雙城遊' : isJa ? '大阪・韓国周遊の旅' : isKo ? '오사카 & 한국 투어' : 'East Asia Grand Tour',
    location: isZh ? '大阪, 首爾, 釜山' : isJa ? '大阪・ソウル・釜山' : isKo ? '오사카, 서울, 부산' : 'Osaka, Seoul, Busan',
    description: isZh 
      ? '一次體驗日本與韓國的精華。從大阪的霓虹燈到首爾的宮殿，再到釜山的海岸線。' 
      : isJa 
      ? '日本と韓国のハイライトを一度に体験。大阪のネオンからソウルの宮殿、そして釜山の海岸線まで。' 
      : isKo 
      ? '일본과 한국의 하이라이트를 한 번에 경험하세요. 오사카의 네온 사인부터 서울의 궁전, 부산의 해안선까지.' 
      : 'Experience the best of Japan and Korea in one trip. From Osaka\'s neons to Seoul\'s palaces and Busan\'s coastlines.',
    flightDep: { code: 'JL820', airport: 'Kansai (KIX)', transport: isZh ? '南海電鐵Rapi:t' : isJa ? '南海ラピート' : isKo ? '난카이 라피트' : 'Nankai Rapi:t' },
    flightTrans1: { code: 'KE722', airport: 'Incheon (ICN)', transport: isZh ? 'AREX 機場快線' : isJa ? 'AREX 空港鉄道' : isKo ? '공항철도 AREX' : 'AREX Express Train' },
    flightTrans2: { code: 'KTX 023', airport: 'Busan Station', transport: isZh ? 'KTX 高速列車' : isJa ? 'KTX 高速列車' : isKo ? 'KTX 고속열차' : 'KTX High Speed Train' },
    flightRet: { code: 'KE085', airport: 'Gimhae (PUS)', transport: isZh ? '輕軌至機場' : isJa ? '空港へのライトレール' : isKo ? '공항 경전철' : 'Light Rail to Airport' },
  };

  return [
    {
      id: '1',
      title: t1.title,
      location: t1.location,
      startDate: '2023-11-10',
      endDate: '2023-11-20',
      description: t1.description,
      status: 'past',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
      defaultCurrency: '¥',
      budget: 500000,
      departureFlight: {
        code: 'JL802',
        gate: '62',
        airport: 'Kansai International (KIX)',
        transport: t1.flightDep.transport
      },
      returnFlight: {
        code: 'JL805',
        gate: '12',
        airport: 'Kansai International (KIX)',
        transport: t1.flightRet.transport
      },
      photos: [
        { id: 'p10', url: 'https://images.unsplash.com/photo-1542640244-7e67286feb90?q=80&w=800', caption: t1.photos.p10, date: '2023-11-10', tags: ['Arrival'], isFavorite: false, type: 'image' },
        { id: 'p11', url: 'https://images.unsplash.com/photo-1478358173913-b40e1d859d78?q=80&w=800', caption: t1.photos.p11, date: '2023-11-11', tags: ['Shrine', 'Hiking'], isFavorite: true, type: 'image' },
        { id: 'p1', url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800', caption: t1.photos.p1, date: '2023-11-12', tags: ['Zen', 'Temple'], isFavorite: true, type: 'image' },
        { id: 'p2', url: 'https://images.unsplash.com/photo-1599723382705-7762b7194602?q=80&w=800', caption: t1.photos.p2, date: '2023-11-13', tags: ['Nature'], isFavorite: false, type: 'image' },
        { id: 'p14', url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800', caption: t1.photos.p14, date: '2023-11-14', tags: ['Sunset', 'History'], isFavorite: true, type: 'image' },
        { id: 'p15', url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=800', caption: t1.photos.p15, date: '2023-11-15', tags: ['Culture', 'Night'], isFavorite: false, type: 'image' },
        { id: 'p16', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=800', caption: t1.photos.p16, date: '2023-11-16', tags: ['Peaceful'], isFavorite: false, type: 'image' },
        { id: 'p17', url: 'https://images.unsplash.com/photo-1484606772793-9c4ce93309a5?q=80&w=800', caption: t1.photos.p17, date: '2023-11-17', tags: ['Animals', 'DayTrip'], isFavorite: true, type: 'image' },
        { id: 'p18', url: 'https://images.unsplash.com/photo-1552055944-13b257e1c74a?q=80&w=800', caption: t1.photos.p18, date: '2023-11-18', tags: ['Architecture'], isFavorite: false, type: 'image' },
        { id: 'p19', url: 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?q=80&w=800', caption: t1.photos.p19, date: '2023-11-19', tags: ['Food', 'FineDining'], isFavorite: true, type: 'image' },
        { id: 'p20', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800', caption: t1.photos.p20, date: '2023-11-20', tags: ['Departure'], isFavorite: false, type: 'image' },
      ],
      comments: [
        { id: 'c1', text: t1.comments.c1, author: 'Wanderer', date: '2023-11-21T10:00:00Z' }
      ],
      rating: 5,
      dayRatings: { 
        '2023-11-10': 4, '2023-11-11': 5, '2023-11-12': 5, '2023-11-13': 4, '2023-11-14': 5,
        '2023-11-15': 5, '2023-11-16': 4, '2023-11-17': 5, '2023-11-18': 4, '2023-11-19': 5, '2023-11-20': 4
      },
      isPinned: true,
      favoriteDays: ['2023-11-11', '2023-11-14', '2023-11-19'],
      itinerary: {
        '2023-11-10': [
          { id: 'ev1', time: '14:00', endTime: '15:15', type: 'transport', title: t1.itinerary.ev1.title, description: t1.itinerary.ev1.desc, estimatedExpense: 3500, actualExpense: 3500, currency: '¥', transportMethod: 'Express Train', travelDuration: '75 mins' },
          { id: 'ev2', period: 'night', type: 'eating', title: t1.itinerary.ev2.title, description: t1.itinerary.ev2.desc, estimatedExpense: 4000, actualExpense: 4200, currency: '¥', transportMethod: 'Walking', travelDuration: '10 mins' }
        ],
        '2023-11-11': [
          { id: 'ev3', time: '07:30', endTime: '10:30', type: 'sightseeing', title: t1.itinerary.ev3.title, description: t1.itinerary.ev3.desc, estimatedExpense: 0, actualExpense: 0, currency: '¥', transportMethod: 'JR Nara Line', travelDuration: '5 mins' },
          { id: 'ev4', time: '13:00', endTime: '15:30', type: 'sightseeing', title: t1.itinerary.ev4.title, description: t1.itinerary.ev4.desc, estimatedExpense: 1000, actualExpense: 1000, currency: '¥', transportMethod: 'Taxi', travelDuration: '15 mins' }
        ],
        '2023-11-12': [
          { id: 'ev5', time: '09:00', endTime: '11:00', type: 'sightseeing', title: t1.itinerary.ev5.title, description: t1.itinerary.ev5.desc, estimatedExpense: 600, actualExpense: 600, currency: '¥', transportMethod: 'Bus 205', travelDuration: '40 mins' },
          { id: 'ev6', time: '14:00', endTime: '16:00', type: 'sightseeing', title: t1.itinerary.ev6.title, description: t1.itinerary.ev6.desc, estimatedExpense: 500, actualExpense: 500, currency: '¥', transportMethod: 'Walking', travelDuration: '20 mins' }
        ],
        '2023-11-13': [
          { id: 'ev7', time: '08:00', endTime: '12:00', type: 'sightseeing', title: t1.itinerary.ev7.title, description: t1.itinerary.ev7.desc, estimatedExpense: 800, actualExpense: 800, currency: '¥', transportMethod: 'Hankyu Line', travelDuration: '30 mins' },
          { id: 'ev8', period: 'afternoon', type: 'eating', title: t1.itinerary.ev8.title, description: t1.itinerary.ev8.desc, estimatedExpense: 4500, actualExpense: 4800, currency: '¥', transportMethod: 'Walking', travelDuration: '5 mins' }
        ],
        '2023-11-14': [
          { id: 'ev9', time: '15:00', endTime: '18:30', type: 'sightseeing', title: t1.itinerary.ev9.title, description: t1.itinerary.ev9.desc, estimatedExpense: 400, actualExpense: 400, currency: '¥', transportMethod: 'Taxi', travelDuration: '20 mins' },
          { id: 'ev10', period: 'night', type: 'shopping', title: t1.itinerary.ev10.title, description: t1.itinerary.ev10.desc, estimatedExpense: 5000, actualExpense: 6500, currency: '¥', transportMethod: 'Walking', travelDuration: '2 mins' }
        ],
        '2023-11-15': [
          { id: 'ev11', period: 'afternoon', type: 'sightseeing', title: t1.itinerary.ev11.title, description: t1.itinerary.ev11.desc, estimatedExpense: 0, actualExpense: 0, currency: '¥', transportMethod: 'Bus', travelDuration: '15 mins' },
          { id: 'ev12', period: 'night', type: 'other', title: t1.itinerary.ev12.title, description: t1.itinerary.ev12.desc, estimatedExpense: 0, actualExpense: 0, currency: '¥', transportMethod: 'Walking', travelDuration: '30 mins' }
        ],
        '2023-11-16': [
          { id: 'ev13', time: '10:00', endTime: '12:00', type: 'sightseeing', title: t1.itinerary.ev13.title, description: t1.itinerary.ev13.desc, estimatedExpense: 500, actualExpense: 500, currency: '¥', transportMethod: 'Bus 17', travelDuration: '35 mins' },
          { id: 'ev14', time: '13:00', endTime: '14:30', type: 'sightseeing', title: t1.itinerary.ev14.title, description: t1.itinerary.ev14.desc, estimatedExpense: 0, actualExpense: 0, currency: '¥', transportMethod: 'Walking', travelDuration: '60 mins' }
        ],
        '2023-11-17': [
          { id: 'ev15', time: '09:00', endTime: '17:00', type: 'sightseeing', title: t1.itinerary.ev15.title, description: t1.itinerary.ev15.desc, estimatedExpense: 5000, actualExpense: 5500, currency: '¥', transportMethod: 'Kintetsu Exp', travelDuration: '45 mins' }
        ],
        '2023-11-18': [
          { id: 'ev16', time: '09:30', endTime: '12:00', type: 'sightseeing', title: t1.itinerary.ev16.title, description: t1.itinerary.ev16.desc, estimatedExpense: 800, actualExpense: 1300, currency: '¥', transportMethod: 'Subway', travelDuration: '10 mins' },
          { id: 'ev17', period: 'afternoon', type: 'sightseeing', title: t1.itinerary.ev17.title, description: t1.itinerary.ev17.desc, estimatedExpense: 0, actualExpense: 0, currency: '¥', transportMethod: 'Walking', travelDuration: '15 mins' }
        ],
        '2023-11-19': [
          { id: 'ev18', period: 'afternoon', type: 'shopping', title: t1.itinerary.ev18.title, description: t1.itinerary.ev18.desc, estimatedExpense: 20000, actualExpense: 25000, currency: '¥', transportMethod: 'Bus', travelDuration: '20 mins' },
          { id: 'ev19', period: 'night', type: 'eating', title: t1.itinerary.ev19.title, description: t1.itinerary.ev19.desc, estimatedExpense: 25000, actualExpense: 28000, currency: '¥', transportMethod: 'Taxi', travelDuration: '10 mins' }
        ],
        '2023-11-20': [
          { id: 'ev20', time: '09:00', endTime: '11:00', type: 'transport', title: t1.itinerary.ev20.title, description: t1.itinerary.ev20.desc, estimatedExpense: 4000, actualExpense: 4000, currency: '¥', transportMethod: 'MK Shuttle', travelDuration: '90 mins' }
        ]
      }
    },
    {
      id: '2',
      title: t2.title,
      location: t2.location,
      startDate: '2024-04-10',
      endDate: '2024-04-20',
      description: t2.description,
      status: 'future',
      coverImage: 'https://images.unsplash.com/photo-1590559899731-a3828395a22c?q=80&w=1200&auto=format&fit=crop',
      defaultCurrency: '$',
      budget: 3000,
      departureFlight: {
        code: t2.flightDep.code,
        gate: 'Terminal 1',
        airport: t2.flightDep.airport,
        transport: t2.flightDep.transport
      },
      returnFlight: {
        code: t2.flightRet.code,
        gate: 'Intl Terminal',
        airport: t2.flightRet.airport,
        transport: t2.flightRet.transport
      },
      flights: {
        '2024-04-10': [{ code: t2.flightDep.code, gate: 'T1', airport: t2.flightDep.airport, transport: t2.flightDep.transport, label: 'Arrival' }],
        '2024-04-13': [{ code: t2.flightTrans1.code, gate: 'G4', airport: t2.flightTrans1.airport, transport: t2.flightTrans1.transport, label: 'Transfer' }],
        '2024-04-17': [{ code: t2.flightTrans2.code, gate: 'Track 5', airport: t2.flightTrans2.airport, transport: t2.flightTrans2.transport, label: 'Transfer' }],
        '2024-04-20': [{ code: t2.flightRet.code, gate: 'G12', airport: t2.flightRet.airport, transport: t2.flightRet.transport, label: 'Return' }]
      },
      photos: [],
      comments: [],
      rating: 0,
      dayRatings: {},
      favoriteDays: [],
      itinerary: {
        '2024-04-10': [
          { id: 'os1', time: '18:00', endTime: '19:30', type: 'transport', title: 'Hotel Check-in Namba', description: 'Settling into the hotel near Dotonbori.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Train', travelDuration: '45 mins' },
          { id: 'os2', time: '19:30', endTime: '21:30', type: 'eating', title: 'Dotonbori', description: 'Food crawl: Takoyaki, Okonomiyaki, and street food.', estimatedExpense: 30, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' }
        ],
        '2024-04-11': [
           { id: 'os3', time: '08:30', endTime: '09:00', type: 'transport', title: 'Travel to USJ', description: 'Taking the JR Yumesaki Line.', estimatedExpense: 5, actualExpense: 0, currency: '$', transportMethod: 'Train', travelDuration: '30 mins' },
           { id: 'os4', time: '09:00', endTime: '13:00', type: 'sightseeing', title: 'Universal Studios Japan', description: 'Super Nintendo World and Mario Kart ride.', estimatedExpense: 80, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '4 hours' },
           { id: 'os5', time: '13:00', endTime: '14:00', type: 'eating', title: 'Toad\'s Cafe', description: 'Themed lunch inside Nintendo World.', estimatedExpense: 25, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '5 mins' },
           { id: 'os6', time: '14:00', endTime: '18:00', type: 'sightseeing', title: 'Harry Potter World', description: 'Wizarding World and Forbidden Journey ride.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '4 hours' },
           { id: 'os7', time: '19:00', endTime: '21:00', type: 'eating', title: 'CityWalk Osaka', description: 'Dinner outside the park gates.', estimatedExpense: 20, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' }
        ],
        '2024-04-12': [
           { id: 'os8', time: '09:00', endTime: '11:30', type: 'sightseeing', title: 'Osaka Castle', description: 'Exploring the castle keep and Nishinomaru Garden.', estimatedExpense: 10, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '20 mins' },
           { id: 'os9', time: '12:00', endTime: '13:30', type: 'eating', title: 'Kuromon Ichiba Market', description: 'Fresh seafood lunch and wagyu beef skewers.', estimatedExpense: 40, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '15 mins' },
           { id: 'os10', time: '14:00', endTime: '16:00', type: 'sightseeing', title: 'Shinsekai & Tsutenkaku', description: 'Retro Osaka vibes and tower view.', estimatedExpense: 10, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '15 mins' },
           { id: 'os11', time: '16:30', endTime: '18:00', type: 'sightseeing', title: 'Abeno Harukas 300', description: 'Observation deck with sunset views.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Walk', travelDuration: '15 mins' },
           { id: 'os12', time: '19:00', endTime: '21:00', type: 'sightseeing', title: 'Umeda Sky Building', description: 'Night view from the floating garden observatory.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '20 mins' }
        ],
        '2024-04-13': [
          { id: 'sel1', time: '08:00', endTime: '09:00', type: 'transport', title: 'Travel to KIX', description: 'Nankai Rapi:t train to airport.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Train', travelDuration: '45 mins' },
          { id: 'sel2', time: '11:00', endTime: '13:00', type: 'transport', title: 'Flight to Seoul', description: 'Flight from Osaka (KIX) to Seoul (ICN).', estimatedExpense: 200, actualExpense: 0, currency: '$', transportMethod: 'Plane', travelDuration: '2 hours' },
          { id: 'sel3', time: '14:30', endTime: '16:00', type: 'transport', title: 'Check-in Myeongdong', description: 'Hotel check-in and refresh.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'AREX', travelDuration: '60 mins' },
          { id: 'sel4', time: '16:30', endTime: '18:30', type: 'sightseeing', title: 'N Seoul Tower', description: 'Cable car ride and panoramic city views.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Cable Car', travelDuration: '20 mins' },
          { id: 'sel5', time: '19:00', endTime: '21:00', type: 'eating', title: 'Myeongdong Night Market', description: 'Street food paradise: Hotteok, Tteokbokki.', estimatedExpense: 25, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' }
        ],
        '2024-04-14': [
          { id: 'sel6', time: '09:00', endTime: '10:30', type: 'other', title: 'Hanbok Rental', description: 'Renting traditional Korean dress for palace entry.', estimatedExpense: 20, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' },
          { id: 'sel7', time: '10:30', endTime: '12:30', type: 'sightseeing', title: 'Gyeongbokgung Palace', description: 'Main royal palace and changing of the guard ceremony.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '5 mins' },
          { id: 'sel8', time: '12:30', endTime: '14:00', type: 'eating', title: 'Tosokchon Samgyetang', description: 'Famous ginseng chicken soup lunch.', estimatedExpense: 18, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '15 mins' },
          { id: 'sel9', time: '14:30', endTime: '16:30', type: 'sightseeing', title: 'Bukchon Hanok Village', description: 'Exploring traditional Korean houses.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '20 mins' },
          { id: 'sel10', time: '17:00', endTime: '19:00', type: 'shopping', title: 'Insadong', description: 'Traditional crafts, tea houses, and Ssamzigil.', estimatedExpense: 40, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '15 mins' },
          { id: 'sel11', time: '19:30', endTime: '21:00', type: 'eating', title: 'Ikseon-dong BBQ', description: 'Korean BBQ dinner in a trendy hanok alley.', estimatedExpense: 35, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' }
        ],
        '2024-04-15': [
           { id: 'sel12', time: '10:00', endTime: '13:00', type: 'sightseeing', title: 'COEX Starfield Library', description: 'Instagrammable library and aquarium visit.', estimatedExpense: 25, actualExpense: 0, currency: '$', transportMethod: 'Subway', travelDuration: '40 mins' },
           { id: 'sel13', time: '13:30', endTime: '15:00', type: 'eating', title: 'Gangnam Lunch', description: 'Modern Korean cuisine in Gangnam district.', estimatedExpense: 20, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' },
           { id: 'sel14', time: '15:30', endTime: '18:00', type: 'sightseeing', title: 'Lotte World Tower', description: 'Seoul Sky observation deck, 5th tallest building.', estimatedExpense: 25, actualExpense: 0, currency: '$', transportMethod: 'Subway', travelDuration: '15 mins' },
           { id: 'sel15', time: '19:00', endTime: '22:00', type: 'shopping', title: 'Hongdae', description: 'Youth culture, street performances, and nightlife.', estimatedExpense: 50, actualExpense: 0, currency: '$', transportMethod: 'Subway', travelDuration: '40 mins' }
        ],
        '2024-04-16': [
           { id: 'sel16', time: '10:00', endTime: '12:00', type: 'sightseeing', title: 'Cheonggyecheon Stream', description: 'Relaxing walk along the urban stream.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Subway', travelDuration: '10 mins' },
           { id: 'sel17', time: '12:30', endTime: '14:00', type: 'eating', title: 'Gwangjang Market', description: 'Bindaetteok (mung bean pancake) and Kalguksu.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '15 mins' },
           { id: 'sel18', time: '14:30', endTime: '17:30', type: 'sightseeing', title: 'Dongdaemun Design Plaza', description: 'Futuristic architecture by Zaha Hadid and shopping.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Subway', travelDuration: '10 mins' },
           { id: 'sel19', time: '18:30', endTime: '20:30', type: 'sightseeing', title: 'Han River Park', description: 'Evening picnic and river cruise.', estimatedExpense: 20, actualExpense: 0, currency: '$', transportMethod: 'Subway', travelDuration: '20 mins' }
        ],
        '2024-04-17': [
          { id: 'bus1', time: '09:00', endTime: '11:30', type: 'transport', title: 'KTX to Busan', description: 'High-speed train from Seoul Station to Busan.', estimatedExpense: 50, actualExpense: 0, currency: '$', transportMethod: 'Train', travelDuration: '2.5 hours' },
          { id: 'bus2', time: '12:00', endTime: '13:30', type: 'eating', title: 'Busan Station Lunch', description: 'Dwaeji Gukbap (Pork Soup Rice), local specialty.', estimatedExpense: 10, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '5 mins' },
          { id: 'bus3', time: '14:00', endTime: '16:30', type: 'sightseeing', title: 'Gamcheon Culture Village', description: 'Colorful hillside village with art murals.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Bus', travelDuration: '30 mins' },
          { id: 'bus4', time: '17:30', endTime: '19:30', type: 'shopping', title: 'BIFF Square', description: 'Nampo-dong shopping and street food (Ssiat Hotteok).', estimatedExpense: 30, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '20 mins' },
          { id: 'bus5', time: '20:00', endTime: '22:00', type: 'eating', title: 'Jagalchi Fish Market', description: 'Fresh seafood dinner at Korea\'s largest fish market.', estimatedExpense: 50, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' }
        ],
        '2024-04-18': [
           { id: 'bus6', time: '09:30', endTime: '11:30', type: 'sightseeing', title: 'Haedong Yonggungsa', description: 'Beautiful buddhist temple by the sea.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Bus', travelDuration: '45 mins' },
           { id: 'bus7', time: '12:00', endTime: '13:30', type: 'eating', title: 'Seaside Lunch', description: 'Seafood noodles with ocean view.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' },
           { id: 'bus8', time: '14:00', endTime: '15:00', type: 'sightseeing', title: 'Blue Line Park', description: 'Sky Capsule ride along the coast.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Train', travelDuration: '30 mins' },
           { id: 'bus9', time: '15:30', endTime: '17:30', type: 'sightseeing', title: 'Haeundae Beach', description: 'Relaxing on the most famous beach in Korea.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '10 mins' },
           { id: 'bus10', time: '19:00', endTime: '21:00', type: 'sightseeing', title: 'The Bay 101', description: 'Night view of the marine city skyline.', estimatedExpense: 10, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '15 mins' }
        ],
        '2024-04-19': [
           { id: 'bus11', time: '10:00', endTime: '12:00', type: 'sightseeing', title: 'Gwangalli Beach', description: 'View of the Diamond Bridge.', estimatedExpense: 0, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '30 mins' },
           { id: 'bus12', time: '12:30', endTime: '14:00', type: 'eating', title: 'Cafe Hopping', description: 'Coffee with a view of Gwangandaegyo Bridge.', estimatedExpense: 15, actualExpense: 0, currency: '$', transportMethod: 'Walking', travelDuration: '5 mins' },
           { id: 'bus13', time: '15:00', endTime: '17:00', type: 'other', title: 'Spa Land Centum City', description: 'Relaxing in a huge Korean jjimjilbang.', estimatedExpense: 20, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '20 mins' },
           { id: 'bus14', time: '18:00', endTime: '20:00', type: 'eating', title: 'Farewell Dinner', description: 'Korean Sashimi (Hoe) dinner.', estimatedExpense: 40, actualExpense: 0, currency: '$', transportMethod: 'Taxi', travelDuration: '15 mins' }
        ],
        '2024-04-20': [
          { id: 'bus15', time: '09:00', endTime: '10:00', type: 'shopping', title: 'Seomyeon Underground', description: 'Last minute souvenir shopping.', estimatedExpense: 50, actualExpense: 0, currency: '$', transportMethod: 'Metro', travelDuration: '20 mins' },
          { id: 'bus16', time: '10:30', endTime: '11:30', type: 'transport', title: 'Travel to Airport', description: 'Light Rail to Gimhae Airport (PUS).', estimatedExpense: 5, actualExpense: 0, currency: '$', transportMethod: 'Light Rail', travelDuration: '30 mins' }
        ]
      }
    }
  ];
};
