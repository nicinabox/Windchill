import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactNative from 'react-native'
import ListSeparator from './ListSeparator'
import * as colors from '../styles/colors'

const {
  StyleSheet,
  View,
  Text,
} = ReactNative

interface ListSectionProps {
  header: React.ReactNode
  footer: React.ReactNode
}

const result = (f: any) => typeof f === 'function' ? f() : f

export const ListSection: React.FC<ListSectionProps> = ({ children, header, footer }) => {
  return (
    <View style={styles.section}>
      {header ? (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>
            {result(header)}
          </Text>
        </View>
      ) : null}

      <ListSeparator />
      {children}

      {footer ? (
        <View style={styles.sectionFooter}>
          <Text style={styles.sectionFooterText}>
            {result(footer)}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
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

export default ListSection
