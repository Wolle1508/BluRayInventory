function excelExport(filmSet) {
     const style = {
          header: {
               fill: {
                    fgColor: {
                         rgb: '8c8c8c'
                    }
               },
               border: {
                    top: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    },
                    left: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    },
                    right: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    },
                    bottom: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    }
               }
          },
          standartCell: {
               border: {
                    top: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    },
                    left: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    },
                    right: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    },
                    bottom: {
                         style: 'thin',
                         color: {
                              rgb: '000000'
                         }
                    }
               }
          }
     };

     const specification = {
          TITLE: {
               displayName: 'Title',
               headerStyle: style.header,
               cellStyle: style.standartCell,
               width: 300
          },
          DURATION: {
               displayName: 'L\u00e4nge',
               headerStyle: {},
               headerStyle: style.header,
               cellStyle: style.standartCell,
               width: 50
          },
          // DIRECTORS: {
          //     displayName: "Regisseur(e)",
          //     headerStyle : {},
          //     width: 250
          // },
          UHD: {
               displayName: 'UHD',
               headerStyle: {},
               headerStyle: style.header,
               cellStyle: style.standartCell,
               width: 50
          },
          // FRANCHISE: {
          //     displayName: "Franchise",
          //     headerStyle : {},
          //     width: 150
          // },
          // STUDIO: {
          //     displayName: "Studio",
          //     headerStyle : {},
          //     width: 150
          // },
          YEAR: {
               displayName: 'Jahr',
               headerStyle: {},
               headerStyle: style.header,
               cellStyle: style.standartCell,
               width: 50
          }
     };

     const report = excel.buildExport([{
          name: 'Blue-reys',
          specification: specification,
          data: filmSet
     }]);

     fs.writeFile(config.exportPath + 'BlueReys.xlsx', report, (err) => {
          if (err) throw err;
          AlertUtils.callSuccessAlert('Table has been exported!');
     });
}