type Option = {
  label: React.ReactNode;
  value: string;
};

const OPTIONS: Option[] = [
  {
    label: (
      <>
        <img src="/angular.png" alt="angular" />
        <span>Angular</span>
      </>
    ),
    value: "angular",
  },
  {
    label: (
      <>
        <img src="/react.png" alt="react" />
        <span>React</span>
      </>
    ),
    value: "react",
  },
  {
    label: (
      <>
        <img src="/vue.png" alt="vue" />
        <span>Vuejs</span>
      </>
    ),
    value: "vue",
  },
];

export default OPTIONS;
