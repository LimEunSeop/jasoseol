# 자소설닷컴 웹 프론트엔드 분야 과제 (채용달력)

## 개요

### 소요시간

3일

- 1일차: 컨셉구상
- 2일차: 마크업 & 기능구현
- 3일차: 마크업 보완, 스타일링 작업. 문서 작성

### 사용 기술

- React (Create React App 사용)
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
