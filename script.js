<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DT 배구부 유형 테스트</title>
  <style>
    :root {
      --primary-color: #600101;
      --primary-hover: #450101;
      --bg-color: #f4f6f9;
      --card-bg: #ffffff;
      --text-color: #222222;
    }

    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px 10px;
    }

    #app {
      background: var(--card-bg);
      width: 100%;
      max-width: 500px;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(96, 1, 1, 0.15);
      text-align: center;
      box-sizing: border-box;
      /* 스크롤이 길어질 경우를 대비해 여백 추가 */
      margin: 20px 0; 
    }

    .screen { display: none; }
    .screen.active { 
      display: block; 
      animation: fadeIn 0.4s ease-in-out; 
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* 로고 크기 */
    .team-logo {
      width: 170px; height: 170px;
      object-fit: cover;
      margin-top: -20px; margin-bottom: -15px;
    }
    .small-logo {
      width: 90px; height: 90px;
      object-fit: cover;
      margin-top: -15px; margin-bottom: -10px;
    }

    h1 { color: var(--primary-color); font-size: 26px; margin-bottom: 8px; font-weight: 800; }
    p { color: #666; font-size: 15px; margin-bottom: 20px; line-height: 1.5; }

    /* 버튼 스타일 */
    button {
      background-color: var(--primary-color);
      color: white; border: none; padding: 15px 20px; margin: 10px 0;
      width: 100%; border-radius: 12px; cursor: pointer; font-size: 16px; font-weight: 600;
      transition: all 0.2s; box-shadow: 0 4px 10px rgba(96, 1, 1, 0.2);
    }
    button:hover { background-color: var(--primary-hover); transform: translateY(-2px); }

    #options-container button {
      background-color: #ffffff; color: var(--primary-color); border: 2px solid var(--primary-color);
      text-align: left; padding: 15px; font-size: 15px; font-weight: 500; box-shadow: none; line-height: 1.4;
    }
    #options-container button:hover { background-color: var(--primary-color); color: white; }

    #question-title {
      font-size: 19px; text-align: left; margin-bottom: 25px; color: #222; line-height: 1.5; font-weight: 700;
    }

    /* --- 결과 화면 전용 디자인 --- */
    #result-title {
      color: var(--primary-color); font-size: 24px; margin: 15px 0 25px 0; font-weight: 800; white-space: pre-line;
    }

    /* 하이큐 매칭 섹션 */
    .haikyuu-section {
      background-color: #222; color: white;
      border-radius: 15px; padding: 20px; margin-bottom: 20px;
    }
    .haikyuu-title { color: #f8c946; font-weight: 700; font-size: 14px; margin-bottom: 5px; }
    #haikyuu-name { font-size: 20px; margin: 0 0 15px 0; }
    .haikyuu-photo {
      width: 100%; max-width: 250px; height: auto;
      border-radius: 10px; border: 3px solid #f8c946;
    }

    /* 분석 컨텐츠 박스 공통 */
    .result-box {
      text-align: left; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 15px; line-height: 1.6;
    }
    .box-title { font-weight: 800; margin-bottom: 10px; font-size: 16px; display: block; }

    /* 심층 분석 */
    .desc-box { background-color: #fdf2f2; border-left: 5px solid var(--primary-color); }
    /* 팩트 폭력 */
    .caution-box { background-color: #f1f3f5; border-left: 5px solid #868e96; }
    /* 궁합 */
    .chemistry-box { background-color: #fff3cd; border: 2px dashed #ffc107; }
    /* 한줄평 */
    .gemini-box { background-color: var(--primary-color); color: white; text-align: center; font-weight: 600; font-size: 16px; border-radius: 15px; }

    /* 단체사진 래퍼 */
    .team-photo-wrapper { margin-top: 35px; padding-top: 25px; border-top: 2px dashed #ddd; }
    .join-text { font-weight: 800; color: var(--primary-color); margin-bottom: 15px; font-size: 17px; }
    .team-photo { width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: block; }

  </style>
</head>
<body>

  <div id="app">
    <!-- 1. 시작 화면 -->
    <div id="intro-screen" class="screen active">
      <img src="logo.jpg" alt="DT 로고" class="team-logo">
      <h1>DT 배구부 유형 테스트</h1>
      <p>AI 매니저 제미나이가 분석하는 나의 포지션은?<br>내 성향과 찰떡인 하이큐 캐릭터까지 알아보자!</p>
      <button onclick="startTest()">테스트 시작하기</button>
    </div>

    <!-- 2. 질문 화면 -->
    <div id="question-screen" class="screen">
      <img src="logo.jpg" alt="DT 로고" class="small-logo">
      <h2 id="question-title">질문 들어갈 자리</h2>
      <div id="options-container"></div>
    </div>

    <!-- 3. 결과 화면 -->
    <div id="result-screen" class="screen">
      <img src="logo.jpg" alt="DT 로고" class="small-logo">
      <h3 id="result-title">결과 타이틀</h3>
      
      <!-- 하이큐 캐릭터 -->
      <div class="haikyuu-section">
        <p class="haikyuu-title">🏐 나와 똑 닮은 하이큐 캐릭터는?</p>
        <h4 id="haikyuu-name">캐릭터 이름</h4>
        <img id="haikyuu-img" src="" alt="하이큐 캐릭터" class="haikyuu-photo">
      </div>

      <!-- 심층 분석 리포트 -->
      <div class="result-box desc-box">
        <span class="box-title">📊 DT 심층 분석 리포트</span>
        <span id="result-desc">결과 설명</span>
      </div>

      <!-- 팩트 폭력 (주의사항) -->
      <div class="result-box caution-box">
        <span class="box-title">🚨 제미나이의 팩트 폭력</span>
        <span id="result-caution">주의사항</span>
      </div>

      <!-- 환상의 궁합 -->
      <div class="result-box chemistry-box">
        <span id="result-chemistry">궁합</span>
      </div>

      <!-- 제미나이 한줄평 -->
      <div class="result-box gemini-box">
        <span id="result-gemini">한줄평</span>
      </div>
      
      <!-- 단체사진 영역 -->
      <div class="team-photo-wrapper">
        <p class="join-text">뜨거운 열정, DT 배구부에서 당신을 기다립니다! 🏐</p>
        <img src="team.jpg" alt="DT 배구부 단체사진" class="team-photo">
      </div>

      <button onclick="location.reload()" style="margin-top: 20px;">테스트 다시 하기</button>
    </div>
  </div>

  <script>
    // 질문 데이터 (7문항)
    const questions = [
      {
        title: "1. 5세트 듀스 매치포인트. DT 벤치에서 AI 매니저 제미나이가 작전을 짜는 사이, 코트로 향하는 당신이 머릿속으로 다짐하는 나의 역할은?",
        options: [
          { text: "제미나이의 데이터를 바탕으로 완벽한 궤적의 패스를 올려 노마크 찬스를 만들어주는 역할", type: "A" },
          { text: "복잡한 계산은 접어두고, 결정적인 순간에 시원한 스파이크로 득점을 내는 영웅의 역할", type: "B" },
          { text: "상대 에이스의 강타를 온몸을 던져 걷어내어 DT팀의 랠리를 끝까지 이어가는 역할", type: "C" },
          { text: "상대 세터의 수를 미리 읽고 네트 앞에서 길목을 차단해 셧아웃 시키는 역할", type: "D" },
          { text: "상대 데이터에 없는 전혀 예상치 못한 타이밍과 위치에서 변칙 공격으로 허를 찌르는 역할", type: "E" }
        ]
      },
      {
        title: "2. 라이벌 팀과의 결승전 전날, 제미나이가 DT 팀원들에게 '상대 팀 전력 분석 리포트'를 전송했습니다. 이를 확인한 당신의 반응은?",
        options: [
          { text: "상대의 약점과 우리 팀의 동선을 머릿속으로 세밀하게 시뮬레이션한다.", type: "A" },
          { text: "결국 승부는 코트 위에서 내 파워와 기세로 결정된다고 믿는다.", type: "B" },
          { text: "리시브 동선과 수비 위치부터 꼼꼼하게 체크한다.", type: "C" },
          { text: "상대 스파이커의 습관과 공격 타이밍을 집중적으로 본다.", type: "D" },
          { text: "당일 내 컨디션과 직감을 최고로 끌어올리는 데 집중한다.", type: "E" }
        ]
      },
      {
        title: "3. 경기 중 연속 3실점으로 DT의 코트 분위기가 무겁게 가라앉았습니다. 제미나이가 '팀 멘탈 회복 솔루션'을 계산하고 있을 때, 당신이 먼저 취하는 행동은?",
        options: [
          { text: "흥분하지 말고 제미나이가 짚어준 다음 전술을 침착하게 다시 맞추자고 한다.", type: "A" },
          { text: "파이팅을 크게 외치며 강한 공격 한 방으로 직접 흐름을 끊어버린다.", type: "B" },
          { text: "동료의 실수를 감싸고 뒤에서 더 든든하게 받쳐주겠다고 다독인다.", type: "C" },
          { text: "흔들리지 않고 조용히 상대 세터의 움직임을 예리하게 관찰하며 블로킹을 노린다.", type: "D" },
          { text: "특유의 텐션으로 농담을 던지거나 코트를 방방 뛰며 긴장감을 단번에 풀어준다.", type: "E" }
        ]
      },
      {
        title: "4. 아뿔싸! 내 뼈아픈 실수로 결정적인 점수를 내줬습니다. 타임아웃 때 제미나이가 리플레이를 보여줄 때, 드는 생각은?",
        options: [
          { text: "'패스 높이가 낮았어. 공격수 타점에 맞게 궤적을 즉각 수정해야지.'", type: "A" },
          { text: "'다음 번엔 무조건 블로커 뚫어버린다. 내 공격력으로 두 배로 만회하면 돼.'", type: "B" },
          { text: "'발이 느렸어. 넘어지더라도 어떻게든 공 밑으로 파고들어서 살려냈어야 했는데.'", type: "C" },
          { text: "'점프 타이밍이 빨랐네. 다음엔 상대 공격수 손끝을 끝까지 보고 뜬다.'", type: "D" },
          { text: "'아쉽네! 그래도 지나간 실수는 빨리 털어버리고 다음 랠리에만 100% 집중하자!'", type: "E" }
        ]
      },
      {
        title: "5. 훈련이 끝난 후, 제미나이가 'DT 배구부 전력 강화를 위해 능력치 하나를 한계 돌파시켜 줄게요'라고 제안합니다. 당신의 선택은?",
        options: [
          { text: "코트 구석구석을 찌르는 자로 잰 듯한 '컴퓨터 토스' 능력", type: "A" },
          { text: "상대 코트를 박살 낼 듯한 파워풀한 '백어택' 능력", type: "B" },
          { text: "어떤 강스파이크도 깃털처럼 부드럽게 받아내는 '반사신경 디그' 능력", type: "C" },
          { text: "상대 공격수를 절망에 빠뜨리는 철벽 같은 '킬 블로킹' 능력", type: "D" },
          { text: "예측 불가능한 궤적으로 꽂히며 코트를 뒤흔드는 '스파이크 서브' 능력", type: "E" }
        ]
      },
      {
        title: "6. 제미나이가 당신과 가장 시너지가 좋을 '영혼의 듀오'를 매칭해 주겠다고 합니다. 어떤 동료를 원하나요?",
        options: [
          { text: "내 싸인을 찰떡같이 알아듣고 계획한 전술대로 완벽하게 움직여주는 지능적인 선수", type: "A" },
          { text: "내 공격이 막히거나 실수를 해도 뒤에서 묵묵하고 든든하게 수비를 받쳐주는 선수", type: "B" },
          { text: "내 수비가 빗나가도 어떻게든 악착같이 득점으로 연결해 내는 믿음직한 에이스", type: "C" },
          { text: "네트 중앙에서 나와 함께 상대의 모든 공격 루트를 원천 봉쇄할 수 있는 든든한 파트너", type: "D" },
          { text: "정해진 틀에 얽매이지 않고 창의적이고 변칙적인 플레이를 즐길 수 있는 선수", type: "E" }
        ]
      },
      {
        title: "7. 삐익-! 우승 확정! 제미나이가 우승의 순간을 기록할 때, 카메라에 담긴 당신의 모습은?",
        options: [
          { text: "전술이 딱 맞아떨어진 것에 흡족해하며 팀원들과 여유롭게 하이파이브를 나눈다.", type: "A" },
          { text: "코트 중심에서 가장 크게 포효하며 관중들과 팀원들의 환호를 적극적으로 유도한다.", type: "B" },
          { text: "스포트라이트 밖에서 함께 고생한 수비 동료들을 말없이 껴안으며 안도한다.", type: "C" },
          { text: "크게 흥분하기보다는 옅은 미소를 지으며 조용히 상대 팀 선수들과 악수를 나눈다.", type: "D" },
          { text: "정체불명의 세리머니 춤을 추며 주체할 수 없는 기쁨을 온몸으로 뿜어낸다.", type: "E" }
        ]
      }
    ];

    // 결과 데이터 (분석, 팩트폭력, 궁합, 하이큐 캐릭터, 이미지 파일명)
    const results = {
      "A": { 
        title: "🧠 냉철한 코트의 지휘관\n'두뇌파 세터'", 
        haikyuuName: "코즈메 켄마 (네코마 고교)",
        haikyuuImg: "kenma.jpg",
        desc: "당신은 코트 위에서 일어나는 모든 상황을 꿰뚫어 보는 완벽한 지휘관입니다. 땀 흘리며 무작정 뛰기보다는, 최소한의 움직임으로 최고의 효율을 뽑아내는 것을 선호하죠.\n\n상대방의 블로킹 위치와 수비 빈틈을 초단위로 계산하여, 아군에게 가장 완벽한 득점 루트를 설계해 줍니다. 일상생활에서도 여행을 가거나 조별 과제를 할 때 플랜 A부터 C까지 머릿속에 다 짜여 있어야 직성이 풀리는 완벽주의자입니다. 팀원들의 장단점을 누구보다 잘 파악하고 있어 적재적소에 역할을 분배하는 타고난 전략가네요!",
        caution: "가끔 계산이 빗나가거나 팀원들이 내 계획대로 안 움직여주면 속으로 스트레스를 엄청 받습니다. '왜 저걸 못하지?'라고 답답해하기보단, 가끔은 완벽주의를 내려놓고 변수 그 자체를 즐겨보는 건 어떨까요?",
        chemistry: "💖 <b>환상의 짝꿍:</b> 내 토스를 찰떡같이 때려주는 '열혈 에이스'\n💔 <b>최악의 상성:</b> 내 계획을 다 부수고 다니는 '자유로운 아포짓'",
        gemini: "💡 \"당신의 완벽한 설계와 날카로운 분석 덕분에 오늘도 우리 팀은 승리했습니다.\""
      },
      "B": { 
        title: "🔥 불꽃 같은 승부사\n'열혈 에이스'", 
        haikyuuName: "보쿠토 코타로 (후쿠로다니 학원)",
        haikyuuImg: "bokuto.jpg",
        desc: "당신은 위기 상황일수록 더욱 빛을 발하는 팀의 심장이자 해결사(아웃사이드 히터)입니다. 실패를 두려워하지 않는 강한 멘탈과 승리를 향한 뜨거운 열정을 가지고 있습니다.\n\n팀이 지고 있어 분위기가 무거울 때, 주저 없이 나서서 흐름을 단번에 가져오는 화끈한 스파이크로 관중과 팀원들을 열광시킵니다. 평소 일상에서도 넘치는 에너지와 타고난 리더십으로 사람들의 시선을 사로잡는 매력적인 주인공 타입입니다!",
        caution: "감정 기복이 플레이에 그대로 드러날 때가 있습니다. 내 공격이 몇 번 막히면 순식간에 시무룩해지기도 하죠. 텐션이 너무 올라가 시야가 좁아졌을 땐, 혼자 다 해결하려 하지 말고 옆에 있는 든든한 동료들을 믿어보세요.",
        chemistry: "💖 <b>환상의 짝꿍:</b> 날 완벽하게 조종해 주는 '두뇌파 세터'\n💔 <b>최악의 상성:</b> 내 텐션을 못 따라오는 '침착한 미들 블로커'",
        gemini: "💡 \"당신의 폭발적인 에너지와 거침없는 스파이크는 팀의 심장을 끓어오르게 합니다.\""
      },
      "C": { 
        title: "🛡️ 묵묵한 수호신\n'철벽 방어 리베로'", 
        haikyuuName: "니시노야 유 (카라스노 고교)",
        haikyuuImg: "nishinoya.jpg",
        desc: "당신은 화려한 스포트라이트가 비추지 않아도 묵묵히 팀을 지탱하는 가장 든든한 방패입니다. 뛰어난 공감 능력과 헌신적인 태도로 동료들의 실수를 감싸고 궂은일을 도맡아 합니다.\n\n상대의 어떤 강한 공격도 끝까지 쫓아가 살려내는 끈기와 집념을 가지고 있죠. 코트 밖 일상생활에서도 주변 사람들을 세심하게 챙기고 배려하며 고민 상담을 가장 많이 들어주는, 조직에 절대 없어서는 안 될 소중한 엄마 같은 존재입니다.",
        caution: "팀원들을 챙기느라 정작 자기 자신의 멘탈이나 체력이 방전되는 줄 모를 때가 많습니다. 수비 하나 실패했다고 세상이 무너진 것처럼 자책하지 마세요. 가끔은 '내 탓'을 멈추고 동료들에게 기대도 괜찮습니다.",
        chemistry: "💖 <b>환상의 짝꿍:</b> 내 수비를 득점으로 바꿔주는 '열혈 에이스'\n💔 <b>최악의 상성:</b> 다칠까 봐 조마조마하게 만드는 '자유로운 아포짓'",
        gemini: "💡 \"당신이 멍투성이가 되며 걷어낸 수많은 공이 우승을 만든 가장 위대한 밑거름입니다.\""
      },
      "D": { 
        title: "🗿 흔들리지 않는 평정심\n'침착한 미들 블로커'", 
        haikyuuName: "츠키시마 케이 (카라스노 고교)",
        haikyuuImg: "tsukishima.jpg",
        desc: "당신은 어떤 상황에서도 쉽게 동요하지 않는 묵직하고 강철 같은 멘탈의 소유자입니다. 상황을 조용하고 예리하게 관찰하다가 결정적인 타이밍에 나서서 상대의 기를 완벽하게 꺾어버립니다.\n\n네트 앞에 당신이 서 있는 것만으로도 상대에게는 넘을 수 없는 거대한 통곡의 벽처럼 느껴집니다. 일상에서도 친구들이 흥분해서 딴소리를 할 때 묵묵히 '팩트'로 상황을 정리하는 타입이죠. 감정 표현이 적어 차가워 보일 수 있지만 사실 속으로는 누구보다 승부욕이 강한 외유내강형 사람입니다.",
        caution: "너무 이성적이고 무덤덤한 태도 때문에 팀원들이 '나만 진심인가?' 하고 오해할 수 있습니다. 속으로만 생각하지 말고, 결정적인 블로킹을 성공했을 때만큼은 동료들과 함께 시원하게 포효하며 기쁨을 나눠보세요!",
        chemistry: "💖 <b>환상의 짝꿍:</b> 나와 합을 맞춰 길목을 좁혀주는 '철벽 방어 리베로'\n💔 <b>최악의 상성:</b> 시끄럽고 돌발 행동이 잦은 '열혈 에이스'",
        gemini: "💡 \"네트 앞을 굳건히 지키는 당신은 그 어떤 창보다 날카롭고 위협적인 방패입니다.\""
      },
      "E": { 
        title: "⚡ 예측불허 분위기 메이커\n'자유로운 아포짓'", 
        haikyuuName: "텐도 사토리 (시라토리자와 학원)",
        haikyuuImg: "tendou.jpg",
        desc: "당신은 톡톡 튀는 개성과 창의력으로 코트 분위기를 단번에 뒤집어 놓는 팀의 절대적인 조커이자 활력소입니다. 정해진 틀이나 뻔한 규칙에 얽매이는 것을 아주 싫어하죠.\n\n직감적이고 본능적인 감각을 바탕으로 한 변칙적인 플레이로 상대의 허를 완벽하게 찔러 당황시킵니다. 지루한 것을 견디지 못하고 항상 새롭고 짜릿한 것을 추구하는 성향이 일상에서도 여과 없이 발휘됩니다. 특유의 밝은 긍정 에너지로 언제나 주변에 웃음이 끊이지 않게 만드는 매력쟁이입니다!",
        caution: "너무 본능과 필(Feel)에 의존하다 보니, 감독님이나 세터의 짜여진 전술과 엇박자가 날 때가 있습니다. 변칙 공격도 좋지만 가끔은 기본기와 약속된 플레이를 지켜줘야 팀원들의 심장이 철렁하지 않는답니다.",
        chemistry: "💖 <b>환상의 짝꿍:</b> 내 변칙 공격을 모두 받아주는 '두뇌파 세터'\n💔 <b>최악의 상성:</b> 내 장난을 팩트로 받아치는 '침착한 미들 블로커'",
        gemini: "💡 \"당신의 예측할 수 없는 플레이와 넘치는 끼는 상대를 당황시키고 우리 팀을 웃게 합니다.\""
      }
    };

    let currentQuestionIndex = 0;
    let scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };

    function startTest() {
      document.getElementById('intro-screen').classList.remove('active');
      document.getElementById('question-screen').classList.add('active');
      showQuestion();
    }

    function showQuestion() {
      const q = questions[currentQuestionIndex];
      document.getElementById('question-title').innerText = q.title;
      
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = '';
      
      // 선택지 랜덤 섞기
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      
      shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option.text;
        btn.onclick = () => selectOption(option.type);
        optionsContainer.appendChild(btn);
      });
    }

    function selectOption(type) {
      scores[type]++;
      currentQuestionIndex++;
      
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      document.getElementById('question-screen').classList.remove('active');
      document.getElementById('result-screen').classList.add('active');
      
      let maxType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      let res = results[maxType];
      
      // 결과 데이터 매핑
      document.getElementById('result-title').innerText = res.title;
      document.getElementById('haikyuu-name').innerText = res.haikyuuName;
      document.getElementById('haikyuu-img').src = res.haikyuuImg;
      
      document.getElementById('result-desc').innerHTML = res.desc.replace(/\n/g, '<br>');
      document.getElementById('result-caution').innerHTML = res.caution.replace(/\n/g, '<br>');
      document.getElementById('result-chemistry').innerHTML = res.chemistry.replace(/\n/g, '<br>');
      document.getElementById('result-gemini').innerText = res.gemini;
    }
  </script>
</body>
</html>