import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactNative from 'react-native'
import ListSeparator from './ListSeparator'
import * as colors from '../styles/colors'

var {
  StyleSheet,
  View,
  Text,
} = ReactNative

const result = (el) => (typeof el === 'function') ? el() : el

export default class ListSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.section}>
        {this.props.header ? (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {result(this.props.header)}
            </Text>
          </View>
        ) : null}

        <ListSeparator />
        {this.props.children}

        {this.props.footer ? (
          <View style={styles.sectionFooter}>
            <Text style={styles.sectionFooterText}>
              {result(this.props.footer)}
            </Text>
          </View>
        ) : null}
      </View>
    )
  }
}

ListSection.propTypes = {
  header: PropTypes.string,
}

ListSection.defaultProps = {
  header: ''
}

var styles = StyleSheet.create({
  section: {
    marginTop: 30,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionHeaderText: {
    color: colors.lightGray,
    fontWeight: '500',
    fontSize: 14,
  },
  sectionFooter: {
    marginHorizontal: 15,
    marginVertical: 8,
  },
  sectionFooterText: {
    color: colors.lightGray,
    fontSize: 13,
  }
})
