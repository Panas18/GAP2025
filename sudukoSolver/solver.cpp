#include <iostream>
#include <thread>
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
    this_thread::sleep_for(chrono::milliseconds(100));
  }
};

int main() {

  vector<vector<char>> board = {{'5', '3', '.', '.', '7', '.', '.', '.', '.'},
                                {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
                                {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
                                {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
                                {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
                                {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
                                {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
                                {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
                                {'.', '.', '.', '.', '8', '.', '.', '7', '9'}};
  Solution solver;

  solver.solveSudoku(board);
}
