'use strict';

var React = require('React');
var Text = require('Text');
var View = require('View');
var StyleSheet = require('StyleSheet');

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text> This is the dashboard </Text>
        <Text> {JSON.stringify(this.props.userInfo)} </Text>
      </View>
    )
  }
};

module.exports = Dashboard;
