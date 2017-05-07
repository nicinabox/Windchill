import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactNative from 'react-native'
import ListSeparator from './ListSeparator'

var {
  StyleSheet,
  View,
  Text,
} = ReactNative

export default class ListSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.section}>
        {this.props.header && (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {this.props.header}
            </Text>
          </View>
        )}

        <ListSeparator />
        {this.props.children}

        {this.props.footer && (
          <View style={styles.sectionFooter}>
            <Text style={styles.sectionFooterText}>
              {this.props.footer}
            </Text>
          </View>
        )}
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
  },
  sectionHeader: {
    marginHorizontal: 15,
    marginTop: 22,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    color: '#888',
    fontWeight: '500',
    fontSize: 14,
  },
  sectionFooter: {
  },
  sectionFooterText: {
  }
})
