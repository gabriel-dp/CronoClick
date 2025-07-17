<h1>
    <p align=center>
        CronoClick
    </p>
</h1>

<p align=center>
    <a href='https://cronoclick.vercel.app/schedule'>cronoclick.vercel.app/schedule</a>
    <br/><br/>
    <img height=30 src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'>
    &nbsp;
    <img height=30 src='https://img.shields.io/badge/Next.js-303030?style=for-the-badge&logo=next.js&logoColor=white'>
    &nbsp;
    <img height=30 src='https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=20232A'>
    &nbsp;
    <img height=30 src='https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white'>
    &nbsp;
    <img height=30 src='https://img.shields.io/badge/MongoDB-00684a?style=for-the-badge&logo=mongodb&logoColor=white'>
    &nbsp;
    <img height=30 src='https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white'>
</p>

&nbsp;

## 💡 Motivation

A time management solution through a software designed to register and organize activities at specific times.

Practical work in the Web Technologies, Software Engineering and Software Development Workshop subject at UFSJ.

Faced with the common need to balance multiple responsibilities and avoid schedule conflicts, the development of this app was driven by the demand for a tool that would simplify the scheduling process and provide a clear view of future commitments.

&nbsp;

## 🖥 Run local

Follow these steps to run the project locally:

**Step 1** - Clone the repository

```bash
git clone https://github.com/gabriel-dp/CronoClick.git
```

**Step 2** - Move to the project folder

```bash
cd CronoClick
```

**Step 3** - Set environment variables in a `.env` file with the same structure as `.env.example`

```env
# mongodb connection url
MONGODB_URL=mongodb://mongo:27017/cronoclick

# user auth control (url must be the same as the app, without final '/')
NEXTAUTH_URL=""
NEXTAUTH_SECRET=""

# key for protected requests (used in bearer token)
NEXT_PUBLIC_API_KEY=""

# feature flags (comment to disable)
NEXT_PUBLIC_FLAG_ATTACHMENTS=1
```

**Step 4** - Install the dependencies

```bash
npm install
```

**Step 5** - Start development server

```bash
npm run dev
```

&nbsp;

### 🐋 Docker setup (Alternative)

It replaces steps 4 and 5. You can run a local database instance and the web server by running:

```bash
docker-compose up
```

&nbsp;

## 👥 Authors

| _Bárbara Assis_ | _Bernardo Detomi_ | _Dilvonei Lacerda_ | _Gabriel de Paula_ | _Gabriel Souza_ | _Henrique Azevedo_ |
| :-: | :-: | :-: | :-: | :-: | :-: |
|[![Bárbara](https://avatars.githubusercontent.com/u/81807439?v=4)](https://github.com/bahdias) | [![Bernardo](https://avatars.githubusercontent.com/u/78918455?v=4)](https://github.com/BernardoDetomi) | [![Dilvonei](https://avatars.githubusercontent.com/u/103136614?v=4)](https://github.com/DilvoneiL) | [![Gabriel de Paula](https://avatars.githubusercontent.com/u/66735014?v=4)](https://github.com/gabriel-dp) | [![Gabriel Souza](https://avatars.githubusercontent.com/u/111782319?v=4)](https://github.com/GSOliveira1) | [![Henrique](https://avatars.githubusercontent.com/u/83303066?v=4)](https://github.com/henrique589) |
