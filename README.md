# 자소설닷컴 웹 프론트엔드 분야 과제 (채용달력)

<a href="https://limeunseop.github.io/jasoseol">![link](https://img.shields.io/badge/link-https%3A%2F%2Flimeunseop.github.io%2Fjasoseol-brightgreen)</a>

## 개요

### 소요시간

3일

- 1일차: 컨셉구상
- 2일차: 마크업 & 기능구현
- 3일차: 마크업 보완, 스타일링 작업. 문서 작성

### 사용 기술

- typescript + React (Create React App 사용)
- 자바스크립트 기본 Date API
- SCSS Module, classnames, react-modal

### 실행방법

`npm start`

## 프로젝트 설명

### 폴더 트리

```
src
 ├── assets : 폰트, 이미지, 비디오 등이 들어갈 곳
 │   └── fonts
 ├── components : 리액트 컴포넌트
 │   └── Calendar : 아래와 같이 클래스충돌없이 스타일을 독립적으로 관리할 수 있습니다.
 │       ├── Calendar.module.scss
 │       └── Calendar.tsx
 ├── styles : 공통으로 사용되는 스타일 관리
 ├── utils : 유틸리티 함수
 └── index.tsx : 엔트리파일
```

### 데이터 관리 방식

- 렌더링에 구애받지 않는 mutable 한 데이터를 구성하기 위해 useRef를 이용해 보관하기로 했습니다.
- 날짜정보를 Key로 한 Map 자료구조를 사용했습니다.
- 최초 API 로딩 후 기업명을 기준으로 정렬했습니다. 그 후 순차접근하여 Map 에 삽입했습니다. 이렇게 하면, 각 날짜별 시작,마감 기업명이 자동적으로 정렬된 상태에서 들어가므로 최적화에 유리할 것이라 생각했습니다.
- 시간을 제외한 날짜비교를 위해 normalizeDate 라는 유틸함수를 만들어 사용했습니다.

### 캘린더 생성 로직

- Javascript Date 객체로 자동계산 하도록 구성했습니다.
- Date 객체를 이용하여 일단 해당 달의 1일과 말일(다음달 - 1)을 구합니다. 그 후, 1일과 말일 각각이 어느 요일인지 메서드로 확인하여, 이전일과 이후일을 prepend, append 하도록 했습니다.
- Date 객체 없이 실제로 캘린더를 만들기 위해서는 많은 계산과 로직이 들어갑니다. 그렇게 한다면 과제구현 본연의 목적에 집중할 수 없을 것이라 판단하였습니다.
