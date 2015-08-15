import React = require('react')

interface TestProps {
  testProp : string
}

interface TestState {
  testSt : string
}
class TestReact extends React.Component<TestProps,TestState>{
  state : TestState ={
    testSt : "test state"
  }

  render() {
    return <div>Hello world!</div>
  }

}

export {TestReact}
