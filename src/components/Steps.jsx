import { Steps } from 'rsuite';

const styles = {
  width: '200px',
  display: 'inline-table',
  verticalAlign: 'top',
};

const MySteps = () => (
  <>
    

    <Steps current={1} vertical style={styles} >
      <Steps.Item title="Today" />
      <Steps.Item title="17 May" />
      <Steps.Item title="18 May" />
      <Steps.Item title="19 May" />
      <Steps.Item title="20 May" />
    </Steps>
  </>
);

export default MySteps;
