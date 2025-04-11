#include <gtest/gtest.h>
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
  bool isValid(vector<vector<char>> &board, int row, int col, char ch) {
    for (int i = 0; i < 9; i++) {
      // check if the row is valid
      if (board[row][i] == ch) {
        return false;
      }

      // check if the column is valid
      if (board[i][col] == ch) {
        return false;
      }

      // check if the 3*3 grid is valid
      int startIndexOfSubRow = 3 * (row / 3);
      int startIndexOfSubCol = 3 * (col / 3);

      int subRow = startIndexOfSubRow + i / 3;
      int subCol = startIndexOfSubCol + i % 3;

      if (board[subRow][subCol] == ch) {
        return false;
      }
    }

    return true;
  }

  bool solveSudukoHelper(vector<vector<char>> &board) {

    for (int row = 0; row < 9; row++) {
      for (int col = 0; col < 9; col++) {
        // check for empty field
        if (board[row][col] == '.') {
          // attempt to put digits from 1 to 9
          for (char ch = '1'; ch <= '9'; ch++) {
            // check if the number is fit
            if (isValid(board, row, col, ch)) {
              board[row][col] = ch;
              // printBoard(board);
              if (solveSudukoHelper(board)) {

                return true;
              } else {

                board[row][col] = '.';
                // printBoard(board);
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  void solveSudoku(vector<vector<char>> &board) { solveSudukoHelper(board); }

private:
  void printBoard(vector<vector<char>> &board) {
    cout << "\033[2J\033[H";
    for (int i = 0; i < 9; i++) {
      for (int j = 0; j < 9; j++) {
        cout << board[i][j] << " ";
        if ((j + 1) % 3 == 0 && j != 8) {
          cout << "| ";
        }
      }
      cout << "\n";
      if ((i + 1) % 3 == 0 && i != 8) {
        cout << "--------------------- \n";
      }
    }
    cout.flush();
  }
};

TEST(SudokuSolverTest, Puzzle1) {
  Solution solver;
  std::vector<std::vector<char>> board = {
      {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
      {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
      {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
      {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
      {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
      {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
      {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
      {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
      {'.', '.', '.', '.', '8', '.', '.', '7', '9'}};

  std::vector<std::vector<char>> expected = {
      {'5', '3', '4', '6', '7', '8', '9', '1', '2'},
      {'6', '7', '2', '1', '9', '5', '3', '4', '8'},
      {'1', '9', '8', '3', '4', '2', '5', '6', '7'},
      {'8', '5', '9', '7', '6', '1', '4', '2', '3'},
      {'4', '2', '6', '8', '5', '3', '7', '9', '1'},
      {'7', '1', '3', '9', '2', '4', '8', '5', '6'},
      {'9', '6', '1', '5', '3', '7', '2', '8', '4'},
      {'2', '8', '7', '4', '1', '9', '6', '3', '5'},
      {'3', '4', '5', '2', '8', '6', '1', '7', '9'}};

  solver.solveSudoku(board);
  ASSERT_EQ(board, expected);
}

TEST(SudokuSolverTest, Puzzle2) {
  Solution solver;
  std::vector<std::vector<char>> board2 = {
      {{'.', '7', '.', '.', '5', '.', '.', '2', '.'},
       {'.', '8', '.', '.', '6', '.', '.', '.', '.'},
       {'3', '.', '4', '.', '.', '.', '9', '8', '.'},
       {'.', '.', '.', '.', '.', '.', '.', '1', '4'},
       {'5', '.', '2', '.', '9', '1', '.', '7', '.'},
       {'.', '.', '.', '.', '.', '6', '3', '.', '.'},
       {'.', '.', '.', '.', '1', '8', '.', '5', '9'},
       {'9', '.', '.', '3', '.', '.', '.', '.', '7'},
       {'1', '6', '.', '2', '.', '.', '.', '4', '.'}}};
  std::vector<std::vector<char>> expected2 = {
      {{'6', '7', '9', '8', '5', '3', '4', '2', '1'},
       {'2', '8', '1', '9', '6', '4', '7', '3', '5'},
       {'3', '5', '4', '1', '2', '7', '9', '8', '6'},
       {'8', '9', '6', '7', '3', '2', '5', '1', '4'},
       {'5', '3', '2', '4', '9', '1', '6', '7', '8'},
       {'4', '1', '7', '5', '8', '6', '3', '9', '2'},
       {'7', '4', '3', '6', '1', '8', '2', '5', '9'},
       {'9', '2', '8', '3', '4', '5', '1', '6', '7'},
       {'1', '6', '5', '2', '7', '9', '8', '4', '3'}}};

  solver.solveSudoku(board2);
  ASSERT_EQ(board2, expected2);
}
