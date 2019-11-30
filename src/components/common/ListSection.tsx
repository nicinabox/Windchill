import React  from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as colors from 'src/styles/colors'

interface ListSectionProps {
  header?: React.ReactNode
  footer?: React.ReactNode
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


      <View style={styles.rows}>
        {children}
      </View>

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
    marginHorizontal: 20,
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
  rows: {
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  sectionFooter: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  sectionFooterText: {
    color: colors.lightGray,
    fontSize: 13,
  }
})

export default ListSection
