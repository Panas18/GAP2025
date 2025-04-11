g++ solver.cpp build/gtest-all.o build/gtest_main.o \
    -Iexternal/googletest/googletest/include -Iexternal/googletest/googletest \
    -pthread -o build/test_runner

