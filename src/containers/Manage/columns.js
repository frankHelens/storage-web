export const getColumns = (that) => {
  return {
    code: {
      label: '订单编号',
      width: 160,
      filter: {
        width: 80,
        type: 'input',
        like: true
      },
      form: {
        type: 'input',
        size: 6
      },
      sortable: 'custom'
    },
    origin: {
      label: '供应商',
      width: 200,
      filter: {
        width: 100,
        type: 'input',
        like: true
      },
      form: {
        type: 'input',
        size: 6
      }
    },
    storageType: {
      label: '仓库名称',
      width: 110,
      type: 'select',
      filter: {
        width: 115,
        type: 'select'
      },
      form: {
        type: 'select',
        size: 6
      },
      relation: 'storageType',
      sortable: true
    },
    takePe: {
      label: '收货人',
      width: 110,
      filter: {
        width: 100,
        type: 'input',
        like: true
      },
      form: {
        type: 'input',
        size: 6
      }
    },
    makePe: {
      label: '制单人',
      width: 110,
      filter: {
        width: 100,
        type: 'input',
        like: true
      },
      form: {
        type: 'input',
        size: 6
      }
    },
    enterPrice: {
      label: '进货金额',
      width: 110,
      filter: {
        type: 'input'
      },
      form: {
        type: 'input',
        size: 6
      },
      sortable: true
    },
    createdAt: {
      width: 110,
      label: '单据日期',
      type: 'time',
      dateType: 'YYYY-MM-DD',
      filter: {
        width: 100,
        type: 'daterange'
      },
      sortable: 'custom'
    },
    updatedAt: {
      width: 110,
      label: '更新时间',
      type: 'time',
      dateType: 'YYYY-MM-DD',
      filter: {
        width: 100,
        type: 'daterange'
      },
      sortable: 'custom'
    },
    productName: {
      width: 200,
      label: '商品名称',
      render: (h, params) => {
        return h('Select', {
          props: {
            filterable: true,
            remote: true,
            loading: that.loading,
            clearable: true,
            remoteMethod: (query) => {
              if (query !== '') {
                that.loading = true
                setTimeout(() => {
                  that.getProducts({
                    url: 'product',
                    params: {
                      filterBy: `name|like|${query}`
                    }
                  })
                  .then(data => {
                    that.loading = false
                    if (data) {
                      that.productOptions = data.data
                      console.log(data)
                    }
                  })
                }, 300)
              } else {
                that.productOptions = []
              }
            }
          }
        }, that.productOptions.map((item, index) => {
          return h('Option', {
            props: {
              key: index,
              value: item.name
            }
          }, item.name)
        }))
      }
    },
    productId: {
      width: 200,
      // label: '商品编码',
      label: 'XXXXX',
      options: [{
        label: 'aaaa',
        value: 'aaaa'
      }, {
        label: 'bbbb',
        value: 'bbbb'
      }, {
        label: 'cccc',
        value: 'cccc'
      }],
      filtersOptions: [],
      render: (h, params) => {
        return h('Select', {
          props: {
            filterable: true,
            remote: true,
            remoteMethod: (query) => {
              console.log(query)
              // this.a.productId.options.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1).map((item, index) => {
              //   return h('Option', {
              //     props: {
              //       key: index,
              //       value: item.value
              //     }
              //   }, item.label)
              // })
            }
          }
        }, [])
      }
    },
    enterNum: {
      width: 200,
      label: '入库金额',
      render: (h, params) => {
        return h('Input', {
          props: {
            value: params.row.enterNum
          }
        })
      }
    },
    discount: {
      width: 200,
      label: '折扣率',
      render: (h, params) => {
        return h('Input', {
          props: {
            value: params.row.discount
          }
        })
      }
    },
    remark: {
      label: '备注',
      width: 350,
      form: {
        type: 'input',
        size: 6
      },
      render: (h, params) => {
        return h('Input', {
          props: {
            value: params.row.remark
          }
        })
      }
    }
  }
}
