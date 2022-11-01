#!/bin/sh -ex

# Merge coverage reports from cypress and jest tests
mkdir -p reports

cp cypress-coverage/coverage-final.json reports/from-cypress.json
cp jest-coverage/coverage-final.json reports/from-jest.json

npx nyc merge reports .nyc_output/out.json
npx nyc report --reporter json --report-dir coverage

# Upload the final coverage report to codecov https://docs.codecov.com/docs/codecov-uploader
curl -Os https://uploader.codecov.io/latest/linux/codecov
chmod +x codecov

# Workaround for https://github.com/codecov/uploader/issues/475
unset NODE_OPTIONS

./codecov -t ${CODECOV_TOKEN} -f "coverage/coverage-final.json"