# Cesium React 프로젝트

React와 Cesium.js를 사용한 3D 지구본 애플리케이션입니다.

## 🚀 빠른 시작

### 1. 프로젝트 클론 및 의존성 설치

```bash
# 프로젝트 클론
git clone <repository-url>
cd my-cesium-app

# 의존성 설치
npm install
```

### 2. Cesium 자산 복사

**중요**: Cesium 자산들이 `.gitignore`에 의해 제외되어 있으므로 수동으로 복사해야 합니다.

```bash
# node_modules에서 Cesium 자산을 public 폴더로 복사
# Windows (PowerShell)
Copy-Item "node_modules\cesium\Build\Cesium\*" "public\cesium\" -Recurse -Force

# Windows (Command Prompt)
xcopy "node_modules\cesium\Build\Cesium\*" "public\cesium\" /E /I /Y

# macOS/Linux
cp -r node_modules/cesium/Build/Cesium/* public/cesium/
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Cesium Ion 토큰을 설정합니다:

```bash
# .env 파일 생성
echo REACT_APP_CESIUM_ION_TOKEN=your_token_here > .env
```

**Cesium Ion 토큰 발급 방법:**

1. [Cesium Ion](https://ion.cesium.com/)에 가입
2. 대시보드에서 Access Token 생성
3. 생성된 토큰을 `.env` 파일에 입력

### 4. 개발 서버 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
my-cesium-app/
├── public/
│   ├── cesium/          # Cesium 자산 (수동 복사 필요)
│   │   ├── Assets/
│   │   ├── Cesium.js
│   │   ├── ThirdParty/
│   │   ├── Widgets/
│   │   └── Workers/
│   └── index.html
├── src/
│   ├── App.tsx          # 메인 컴포넌트
│   └── ...
├── .env                 # 환경 변수 (생성 필요)
├── .gitignore
└── package.json
```

## 🔧 주요 설정 파일

### package.json

```json
{
  "scripts": {
    "start": "set CESIUM_BASE_URL=/cesium && react-scripts start",
    "build": "set CESIUM_BASE_URL=/cesium && react-scripts build"
  }
}
```

### .env

```
REACT_APP_CESIUM_ION_TOKEN=your_cesium_ion_token_here
```

## ⚠️ 주의사항

1. **Cesium 자산 복사 필수**: `public/cesium` 폴더가 비어있으면 애플리케이션이 정상 작동하지 않습니다.

2. **환경 변수 설정**: `.env` 파일이 없으면 Cesium Ion 서비스에 접근할 수 없습니다.

3. **Git 제외 파일**: 다음 파일들은 Git에서 제외됩니다:
   - `node_modules/`
   - `public/cesium/`
   - `.env`

## 🐛 문제 해결

### 흰색 화면이 나오는 경우

1. 브라우저 개발자 도구(F12) → 콘솔 탭에서 오류 확인
2. `public/cesium` 폴더에 파일들이 제대로 복사되었는지 확인
3. `.env` 파일에 올바른 토큰이 설정되었는지 확인

### Cesium 자산 로딩 실패

```bash
# 자산 재복사
rm -rf public/cesium
mkdir public/cesium
cp -r node_modules/cesium/Build/Cesium/* public/cesium/
```

### 환경 변수 문제

```bash
# .env 파일 확인
cat .env

# 토큰 유효성 확인
# Cesium Ion 대시보드에서 토큰 상태 확인
```

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

### 배포 시 주의사항

- `public/cesium` 폴더가 서버에 올바르게 업로드되었는지 확인
- 환경 변수가 프로덕션 환경에 설정되었는지 확인

## 🔗 유용한 링크

- [Cesium 공식 문서](https://cesium.com/learn/)
- [Resium 문서](https://resium.darwineducation.com/)
- [Cesium Ion](https://ion.cesium.com/)

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
