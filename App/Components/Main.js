'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var Text = require('Text');
var View = require('View');
var TextInput = require('TextInput');
var TouchableHighlight = require('TouchableHighlight');
var ActivityIndicator = require('ActivityIndicator');
var api = require('../Utils/api')
var Dashboard = require('../Components/Dashboard');
var LoginScreen = require('../Components/login/LoginScreen');
var Test = require('../Components/Test')

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleSubmit(){
    //update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found'){
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      });
    //fetch data from github
    //reroute to the next passing that github information
  }
  testSubmit(){
    this.props.navigator.push({
      title: "Login Page",
      component: Test,
      passProps: {
      }
    });
  }
  render(){
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for An Activity </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />

          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}> Search </Text>
          </TouchableHighlight>


          <TouchableHighlight
            style={styles.button}
            onPress={this.testSubmit.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}> Test </Text>
          </TouchableHighlight>

          <ActivityIndicator
            animating={this.state.isLoading}
            color="#111"
            size="large">
          </ActivityIndicator>
          {showErr}
      </View>
    )
  }
};

module.exports = Main;
