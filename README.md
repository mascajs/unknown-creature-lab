# 미확인생물 연구소

둔원초등학교 6학년을 위한 디지털새싹 AI 수업 프로그램입니다.

## 이용 순서

연구소 입소 → 설문 두 개 → 인턴연구원증 꾸미기·저장 → AI 기초 설명 → 관찰 퀴즈 세 개 → 수업 활동 → 복습 다섯 문제 → 신입연구원 승급 → 2차시 자료실 → 3차시 자료실.

설문 화면에서 운영기관은 **대전과학기술대학교 산학협력단**으로 안내합니다. 공식 설문 사이트에서 제출한 뒤 돌아와 확인 버튼을 눌러 다음 단계로 진행합니다.

AI 기초 설명·복습·2차시 자료실·3차시 자료실은 단계별로 다른 수업 코드를 입력하면 열립니다. 자료실에는 사건파일 #1 이미지와 곰·고릴라·사람 학습 카드 ZIP(각 20장)이 있습니다. 3차시 자료실에는 고라니·고양이·너구리·부엉이 MP3 네 개가 있습니다. 화면 잠금은 수업 진행을 위한 장치이며 사용자 인증 기능은 아닙니다. 이름·선택한 캐릭터·다짐·진행 상태는 현재 브라우저 탭에만 저장합니다.

캐릭터와 다짐은 직접 선택합니다. 연구원증은 PNG로 저장할 수 있고, ID 없이 등급과 날짜를 표시합니다.

## 배포

HTML/CSS/JavaScript 정적 사이트입니다. 별도 서버나 빌드 과정이 필요하지 않습니다. GitHub Pages의 `main` 브랜치 `/ (root)`를 배포 대상으로 설정합니다. `.nojekyll`을 포함합니다.

파일을 업데이트하면 같은 주소에서 변경된 사이트를 사용할 수 있습니다. `index.html`과 함께 `assets` 폴더, 글꼴, 나머지 JavaScript 및 `opening.html`을 보관하세요.

## 이미지·글꼴·코드

- 캐릭터: [Casual Avatars by Kitsuge Apps](https://opengameart.org/content/casual-avatars), CC0. 원본 10종과 추가 제작 2종을 포함합니다.
- 동물 사진: Yinan Chen, [Gfp-capybara](https://commons.wikimedia.org/wiki/File:Gfp-capybara.jpg), Public domain.
- 스테이플러 사진: Santeri Viinamäki, [Red stapler](https://commons.wikimedia.org/wiki/File:Red_stapler.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). 크기 조정 및 화면 자르기를 적용했으며 사진 조정본에도 같은 라이선스를 적용합니다.
- 로고: [Supercell 공식 브랜드 자료실](https://brand.supercell.com/media)의 원본 로고입니다.
- 수업 자료의 종이·핀·도장을 재사용했습니다. 글꼴은 런드리고딕 Regular/Bold입니다.
- 관찰 화면은 [Scrolline v2](https://github.com/gongnyang/awesome-html-scrolline-deck)의 계획 및 발표자 기능과 GSAP를 포함합니다. 해당 코드의 MIT 이용 조건은 `opening.html` 안에 있습니다. 사이트 전체의 라이선스를 별도로 지정한 것은 아닙니다.

사진 및 로고 출처는 퀴즈의 전체 공개 후에도 표시합니다.
