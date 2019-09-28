if grep "ctrl.localhost" /etc/hosts  && grep "test.localhost" /etc/hosts ; then
  echo "Host entries already found"
else
  cat > hosts.tmp << EOF
ctrl.localhost     127.0.0.1
test.localhost     127.0.0.1
EOF
  cat /etc/hosts > hosts.own
  cat hosts.tmp hosts.own > /etc/hosts
  rm hosts.tmp hosts.own
fi
