# 动态规划
## 动态规划.js
所有的动态规划都可以从暴力递归优化而来,将每一个子问题的解记录下来 可以避免重复计算,把暴力递归的过程, 抽象成了状态表达,并且存在化简状态表达，使其更加简洁的可能，所以写的动态规划的过程为，先想使用暴力递归怎么去尝试，然后在这个基础之上看怎么优化。

给你一个二维数组，二维数组中的每个数都是正数，要求从左上角走到右下角，每一步只能向右或者向下。沿途经过的数字要累加起来。返回最小的路径和。

> 思路：每一步可以走右边和下面，我们走两者当中较小的那一条路，并且如果到达了右边界那么只能往下走，到达了下边界，只能往右走，在边界上没有优先级，只能朝一条路走
```javascript
// 暴力递归方式
function walk(arr, i, j) {
    if(i === arr.length - 1 && j === arr[0].length - 1) { // 到达最右下角
        return arr[i][j]
    }
    if(i === arr.length - 1) { // 到达下边界
        return arr[i][j] + walk(arr, i, j + 1)
    }
    if(j === arr[0].length - 1) { // 到达右边界
        return arr[i][j] + walk(arr, i + 1, j)
    }
    // 没有到边界
    let right = arr[i][j] + walk(arr, i, j + 1)
    let left = arr[i][j] + walk(arr, i + 1, j)
    return arr[i][j] + Math.max(right, left) // 选择最优解
}

// 动态规划优化暴力递归
// 前面的暴力递归存在一个很大的问题，就是回去重复的计算一个子问题，例如f(0, 0)需要f(0， 1)和f(1，0)的结果
// 然后f(0,1)需要f(0，2)和f(1，1)的结果，而f(1，0)需要f(1，1)和f(2，0)，可以看出暴力递归会重复即计算f(1，1)
// 的结果。所谓动态规划，就是能够使我们将计算过得值缓存起来，不需要重复计算的过程

// 对于有重复状态的，并且是无后效性，即对于同一个参数，返回值一定是固定的，一般都可以改为动态规划

// 记忆化搜索:
// 所以上面的改造，可以使用一个二维表(dp)来存储计算过得值，然后再递归过程当中去更新它, 最后直接从dp表中拿想要的值,
var dp = [[]]
dp[i][j] = 200
function walk(arr, i, j) {
    if(dp[i][j]) {
        return dp[i][j]
    }
    if(i === arr.length - 1 && j === arr[0].length - 1) { // 到达最右下角
        return dp[i][j]
    }
    if(i === arr.length - 1) { // 到达下边界
        dp[i][j] = arr[i][j] + walk(arr, i, j + 1)
        return dp[i][j]
    }
    if(j === arr[0].length - 1) { // 到达右边界
        dp[i][j] = arr[i][j] + walk(arr, i + 1, j)
        return dp[i][j]
    }
    // 没有到边界
    let right = walk(arr, i, j + 1)
    let left = walk(arr, i + 1, j)
    dp[i][j] = arr[i][j] + Math.max(right, left)
    return dp[i][j] // 选择最优解
}

// 真正的 dp 改造:
function walkDP(arr) {
    if(!arr || arr.length < 1) return 0
    let x = arr.length,
        y = arr[0].length
    for (let i = x - 2; i >= 0; i--) {
        arr[i][y - 1] = arr[i + 1][y - 1] + arr[i][y - 1]
        arr[y - 1][i] = arr[y - 1][i + 1] + arr[y - 1][i]
    }
    for(let i = x - 2; i >= 0; i--) {
        for(let j = y - 2; j >= 0; j--) {
            arr[i][j] = Math.min(arr[i + 1][j], arr[i][j + 1]) + arr[i][j]
        }
    }
    return arr[0][0]
}
//给你一个数组arr，和一个整数aim。如果可以任意选择arr中的 数字，能不能累加得到aim，返回true或者false
/**
 * 
 * @param {*} arr 
 * @param {*} curi 
 * @param {*} sum 
 * @param {*} aim 
 */
function sum(arr, curi, sum,  aim) {
    if(arr.length == curi) {
        return  sum === aim
    }
    return sum(arr, curi + 1, sum + arr[curi], aim) || sum(arr, curi + 1, sum, aim)
}

// 分析后效性: 对于前面的任意一个状态i 和 sum ,后面的值都是一样的结果，所以没有后效性，可以改为动态规划, 一个dp表，x是所有给出的和,表示aim不会超出这个范围，y是所有可能的i，对于任意一个
// crui 和 sum 都依赖于 curi + 1, sim + arr[curi] 和 curi + 1 和 arr[curi] 这两个格子
function sumDP(arr, aim) {
    if (!arr || arr.length < 1) return false
    let sum = arr.reduce((pre, cur) => {
        return pre + cur
    })
    let len = arr.length
    let dp = new Array(len + 1)
    dp[len] = []
    for (let i = 0; i <= sum; i++) {
        dp[len][i] = i === aim ? true : false
    }
    for(let i = len - 1; i >= 0; i--) {
        dp[i] = []
        for(let j = sum; j >= 0; j--) {
            let res = false
            if (j + arr[i] <= sum) {
                res = res || dp[i + 1][j + arr[i]] || dp[i + 1][j]
            } else {
                res = res || dp[i + 1][j]
            }
            dp[i][j] = res
        }
    }
    return dp[0][0]
}
```
## 子数组最大异或和.js
给定一个数组，求子数组的最大异或和。一个数组的异或和为，数组中所有的数异或起来的结果。

> 方法一: 暴力法O(n^3)：使用 dp 优化O(N^2)。a ^b = c  => a ^ c = b => b = a ^ c

> 方法二：思路：前缀树的应用，利用每一个数的二进制，形成前缀树
```javascript
function maxXorSubarray(arr) {
    if (!arr || arr.length == 0) {
        return 0
    }
    let max = Number.MIN_SAFE_INTEGER
    let eor = 0
    let numTrie = Numtrie()
    numTrie.add(0)
    for (let i = 0; i < arr.length; i++) {
        eor ^= arr[i]
        max = Math.max(max, numTrie.maxXor(eor))
        numTrie.add(eor)
    }
    return max
}

function Node() {
    this.nexts = []
}
function NumTire() {
    let head = new Node()
    // 添加一个数
    function add(num) {
        let cur = head
        for (let move = 31; move >= 0; move--) {
            let path = ((num >> move) & 1) // 从高到低获得每一位
            // 生成前缀树，如果有路就继续往下走，如果没有就新建一个node
            cur.nexts[path] = cur.nexts[path] ? new Node() : cur.nexts[path]
        }
    }
    // 获取最大异或值，num 为 0 ~ i 的异或结果
    function maxXor(num) {
        let cur = head
        let res = 0
        for (let move = 31; move >= 0; move--) {
            let path = ((num >> move) & 1) // 从高到低获得每一位
            // 如果是符号位，那么选着一样的值这样能得到 0， 为正数，否者取反，始终得到 1.best为期待要走的路
            let best = move === 31 ? path : (path ^ 1)
            // 如果有可以走的路，那么就走，否者就取反。这里 best 更新为实际要走的路
            best = cur.nexts[best] ? best : (best ^ 1)
            // 当得到了某一位的值的时候，需要设置到 res 中。
            res |= (path ^ best) << move
        }
        return res
    }
}
```
## 字符串匹配问题.js
【题目】 给定字符串str，其中绝对不含有字符'.'和'*'。再给定字符串exp， 其中可以含有'.'或'*'，'*'字符不能是exp的首字符，并且任意两个 '*'字符不相邻。exp中的'.'代表任何一个字符，exp中的'*'表示'*' 的前一个字符可以有0个或者多个。请写一个函数，判断str是否能被 exp匹配。
【举例】 str="abc"，exp="abc"，返回true。 str="abc"，exp="a.c"，exp中单个'.'可以代表任意字符，所以返回 true。str="abcd"，exp=".*"。exp中'*'的前一个字符是'.'，所以可表示任 意数量的'.'字符，当exp是"...."时与"abcd"匹配，返回true。 str=""，exp="..*"。exp中'*'的前一个字符是'.'，可表示任意数量 的'.'字符，但是".*"之前还有一个'.'字符，该字符不受'*'的影响， 所以str起码有一个字符才能被exp匹配。所以返回false。

题意可以理解为给定一个正则 exp 包含 . 和 *。看是否可以匹配 str
```javascript
// 递归版本:
function match(str, exp) {
    function newMatch(i, j) {
        // 这里使用 exp 的 length 来判断结尾的原因是，''和'.*'这种情况会出现问题。
        if (j === exp.length) {
            return i === str.length
        }
        // exp 如果已经到结尾了 或则 下一个位置不是 *
        if (j === exp.length - 1 ||  exp[j + 1] !== '*') {
            return i !== str.length // 如果 j 上还有字符，而 i 没有字符了返回 false
                && (exp[j] == str[i] || exp[j] == '.')
                && newMatch(i + 1, j + 1) // 如果当前的匹配上了，那么匹配下一个位置
        }
        // 如果没有命中前面的，说明 下一个位置是 *
        // 如果首字符能配上
        while (i != str.length && (exp[j] == str[i] || exp[j] == '.')) {
            // 看后面能不能匹配上，如果能，那么直接返回 true
            if (newMatch(i, j + 2)) {
                return true
            }
            // 如果后面不能返回 true
            i++
        }
        // 如果首字符不能配上
        return newMatch(i, j + 2)
    }
}
// 动态规划版本: i 和 j 确定了，返回值就能确定, 二维表。
// 根据前面的递归版本，从每一个 process 子过程中可以发现，在 dp 表中，初始时刻
// 至少需要搞定倒数两列的数据，和倒数第一排的数据。然后可以填表，倒退到 i = 0, j = 0 的位置。
// 利用 basecase 填表，如果不够使用，那么回到题意中，将需要的没有填的数据填满
function isMatchDp(str, exp) {
    if (!str || !exp) {
        return false
    }
    let s = str.split('')
    let e = exp.split('')
    let dp = initDPMap(s, e)
    for (let i = s.length - 1; i > -1; i--) {
        for (let j = e.length - 2; j > -1; j--) {
            if (e[j + 1] != '*') {
                dp[i][j] = (s[i] == e[j] || e[j] == '.')
                    && dp[i + 1][j + 1]
            } else {
                let si = i
                while (si != s.length && (s[si] = e[j] || e[j] == '.')) {
                    if (dp[si][j + 2]) {
                        dp[i][j] = true
                        break
                    }
                    si++
                }
                if (dp[i][j] != true) {
                    dp[i][j] = dp[si][j + 2];
                }
            }
        }
    }
    return dp[0][0]
}

function initDPMap(s, e) {
    let slen = s.length,
        elen = e.length;
    let dp = []
    dp[slen][elen] = true
    for(let j = elen - 2; j > -1; j = j -2) {
        if (e[j] != '*' && e[j + 1] == '*') {
            dp[slen][j] = true
        } else {
            break
        }
    }
    if (slen > 0 && elen > 0) {
        if ((e[elen - 1] == '.' || s[slen - 1] == e[elen - 1])) {
            dp[slen - 1][elen - 1] = true
        }
    }
    return dp
}
```
## 换钱的方法数.js
【题目】 给定数组arr，arr中所有的值都为正数且不重复。每个值代表 一种面值的货币，每种面值的货币可以使用任意张，再给定一 个整数aim代表要找的钱数，求换钱有多少种方法。
【举例】 arr=[5,10,25,1]，aim=0。 组成0元的方法有1种，就是所有面值的货币都不用。所以返回1。 arr=[5,10,25,1]，aim=15。组成15元的方法有6种，分别为3张5元、1张10元+1张5元、1张 10元+5张1元、10张1元+1张5元、2张5元+5张1元和15张1元。所 以返回6。arr=[3,5]，aim=2。任何方法都无法组成2元。所以返回0。
```javascript
// 暴力递归法
function process(arr, index, aim) {
    let res = 0
    if (index === arr.length) {
        res = aim === 0 ? 1 : 0
    } else {
        for (let zhang = 0; zhang < arr[index] * zhang <= aim; zhang++) {
            res += process(arr, index + 1, aim - arr[index] * zhang)
        }
    }
    return res
}

// 改造为 dp
// 1) 记忆化搜索，即加一个全局缓存, 也可以称为动态规划
let dp = {}
function process(arr, index, aim) {
    let res = 0
    if (index === arr.length) {
        res = aim === 0 ? 1 : 0
    } else {
        for (let zhang = 0; zhang < arr[index] * zhang <= aim; zhang++) {
            let key = aim - arr[index] * zhang + ''
            let temp = 0
            if (dp[key]) {
                temp = dp[key]
            } else {
                temp = process(arr, index + 1, aim - arr[index] * zhang)
                dp[key] = temp
            }
            res += temp
        }
    }
    return res
}

// 2)画表 index 和 aim 作为二维表的坐标;
// 先分析结果需要得到的结果在表格中的位置
// 然后根据 basecase 填表
// 分析位置依赖
// 如果更具 位置依赖， basecase填表的数据不够，那么回到题目中根据题意填剩下需要的表格。
// 在推出表之后。可以进一步优化，优化寻找过程。对于每一个位置，如果都需要寻找相同的累加，那么可以优化。
function coins4(arr, aim) {
    if (!arr || arr.length == 0 || aim < 0) {
        return 0
    }
    let dp = []
    for(let i = 0; i < arr.length; i++) {
        if (!dp[i]) dp[i] = []
        dp[i][0] = 1
    }
    for(let j = 1; arr[0] * j <= aim; j++) {
        dp[0][arr[0] * j] = 1
    }
    for (let i = 1; i < arr.length; i++) {
        for(let j = 1; j <= aim; j++) {
            dp[i][j] = dp[i - 1][j]
            dp[i][j] += j - arr[i] >= 0 ? dp[i][j - arr[i]] : 0
        }
    }
    return dp[arr.length - 1][aim]
}
```
## 暴力递归.js
把问题转化为规模缩小了的同类问题的子问题(不是想到如何去解决一个问题，而是想到如何去尝试，这是递归能力的关键)，有明确的不需要继续进行递归的条件 (base case)，有当得到了子问题结果之后的决策过程，不记录每一个子问题的解
```javascript
// 求 n!
function factorial(n) {
    if(n === 1) {
        return 1
    }
    return n * factorial(n - 1)
}
// 汉诺塔问题
// 打印 n 层汉诺塔从最左边移动到最右边的全过程，有三根杆子，并且每一步的杆子中都必须是小的在上面，大的在下面
// 解析: 假如有N 个在左边(from杆)，那么当前需要做的就是将N-1的移到中间的那根杆子（help杆）上去，然后再将剩下的一个移到最右边的那个杆子（to杆）上去就可以了
// 然后下一步就是将 help 杆上的 n - 1个移到 to 杆上面去就可以了。 这是一个basecase

/**
 *
 * @param {*} N 表示当前是1~N的问题，注意是当前，而且全都停留在 from 这个杆子上
 * @param {*} from 起始杆子
 * @param {*} to 目的杆子
 * @param {*} help 多余的一根辅助杆子
 * process(10, '1', '3', '2')
 */
function process(N, from, to, help) {
    if(N === 1) {
        console.log("move 1 from " + from + "to" + to)
    } else {
        process(N - 1, from, help, to)
        console.log("move " + N + " from " + from + " to " + to)
        process(N - 1, help, to, from)
    }
}

// 打印一个字符串所有的子序列
// 分析: 当前位置，每一步都有两个决策，要当前位置，和不要当前位置，要的话就连起来，不要的话就位空
/**
 *
 * @param {*} str 数组
 * @param {*} i 当前位置
 * @param {*} result 当前的结果
 */
function printAllSub(str, i, result) {
    if(i === str.length) {
        console.log(result)
        return
    }
    printAllSub(str, i + 1, result) // 不要当前的字符
    printAllSub(str, i + 1, result + str[i]) // 要当前的字符
}

// 打印一个字符串的全部排列，要求不要出现重复的排列
function arrangement(str, step) {
    if (step === str.length - 1) {
        console.log(str.join(''))
        return
    }
    let temp
    arrangement(str, step + 1) // 为了避免 i 移动后都要重新走不交换的这一步，所以只需要走一步就可以了，拿出来，而不是放到 for 循环中
    for (let i = step + 1; i < str.length; i++) {
        if (str[i] === str[step]) continue
        temp = str[step]
        str[step] = str[i]
        str[i] = temp
        arrangement(str, step + 1)
        temp = str[step]
        str[step] = str[i]
        str[i] = temp
    }
}
// 母牛每年生一只母牛，新出生的母牛成长三年后也能每年生一只 母牛，假设不会死。求N年后，母牛的数量。
// 思路: 前四年的牛的数量分别问 1 2 3 4, 因为这个时候只有第一只牛在生，从第五年开始，每一年的牛的数量等于去年的牛的数量 + 三年前的牛的数量(即三年前的牛都可以分别生一只)
// 表达式: f(n) = f(n - 1) + f(n - 3) 在n > 4的情况下
function cow(n) {
    if (n <= 4) return n
    let res = [0, 1, 2, 3, 4]
    return cow(n - 1) + cow(n - 3)
}
```
## 最大搜索二叉子树.js
```javascript
// 树形 dp， 需要分析所有的可能性。

// 给定一颗二叉树，求它的最大的一颗子树，且为搜索二叉树
// 思路：以每一个节点为头，求它的最大搜索二叉树
// 三种情况：1) 以当前节点为头结点的整棵树是搜索二叉树
//         2) 搜索二叉树在当前节点的左孩子中
//         3) 搜索二叉树在当前节点的右孩子中

// 对于每一个节点，递归的时候需要搜集一些信息:
//  1): 左树上最大搜索二叉子树的大小（情况1）
//  2): 右树上最大搜索二叉子树的大小（情况2）

//  3): 左树上的最大搜索二叉子树的头部（情况3）
//  4): 右树上的最大搜索二叉子树的头部
//  5): 左树上的最大值
//  6): 右树上的最小值

function BiggestSubBSInTree(head) {
    function Node(value) {
        this.value = value
        this.left = null
        this.right = null
    }
    function RetureType(size, head, min, max) {
        this.size = size
        this.head = head
        this.min = min
        this.max = max
    }
    function process(head) {
        if (!head) {
            return new RetureType(0, null, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
        }
        let leftSubTresInfo = process(head.left)
        let rightSubTresInfo = process(head.right)
        // 可能性3
        let includeItSelf = 0
        if (leftSubTresInfo.head === head.left
            && rightSubTresInfo.head === head.right
            && leftSubTresInfo.max < head.value
            && rightSubTresInfo.min > head.value) {
            includeItSelf = leftSubTresInfo.size + rightSubTresInfo.size + 1
        }
        // 可能性1、2
        let p1 = leftSubTresInfo.size
        let p2 = rightSubTresInfo.size
        let maxSize = Math.max(Math.max(p1, p2), includeItSelf)

        let maxHead = p1 > p2 ? leftSubTresInfo.head : rightSubTresInfo.head
        if (maxSize === includeItSelf) {
            maxHead = head
        }
        return new RetureType(
            maxSize,
            maxHead,
            Math.min(Math.min(leftSubTresInfo.min, rightSubTresInfo.min), head.value),
            Math.max(Math.max(leftSubTresInfo.max, rightSubTresInfo.max), head.value)
        )
    }
}


// 二叉树中，一个节点可以往上走回文往下走，那么节点A总能走到节点B。
// 节点A走到节点B的距离为：A走到B最短路径的节点个数。
// 求一颗二叉树上的最远距离
// 思路：和上面类似，求每一个节点的相关信息。每一个节点都有一个信息，包含以该节点为根节点的
// 的树下的最长距离maxDistance和高度h
```
## 步数和位置问题.js
```javascript
// 给定一个 N表示位置 1~ N、M 表示初始位置、P 表示可以走的步数、K 表示最终位置
// 求在初始位置走 P 步能走到 K 位置的方法都多少种

// 暴力递归法
function ways(N, M, P, K) {
    if (N < 1 || M < 1 || M > N || P < 0 || K < 1 || K > N) {
        return 0
    }
    if (P == 0) {
        return M === K ? 1 : 0
    }
    let res = 0
    if (M === 1) {
        res = ways(N, M + 1, P - 1, K)
    } else if (M == N) {
        res = ways(N, M - 1, P - 1, K)
    } else {
        res = ways(N, M + 1, P - 1, K) + ways(N, M - 1, P - 1, K)
    }
    return res
}

// 改为 动态规划
// 分析: 可变参数 M, P 且无后效性，即 M, P定了之后ways(N,M,P,K)始终返回同一个值
// 根据 basecase 填数据
// 根据代码分析数据依赖情况

function setpAndPositionDP(p, m, k, n) {
    if (p < 0 || m < 1 || m > n || k > n || k < 1) {
        return 0
    }
    let dp = [[]], flag = false
    for (let i = 1; i <= n; i++) {
        dp[0][i] = i === k ? 1 : 0
    }
    for (let i = 1; i <= p; i++) {
        if (flag) break
        if (!dp[i]) dp[i] = []
        for (let j = 1; j <= n; j++) {
            if (j === 1) {
                dp[i][j] = dp[i - 1][j + 1]
            } else if(j === n) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j + 1]
            }
            if (i === p && j === m) {
                flag = true
                break
            }
        }
    }
    return dp[p][m]
}
```
## 硬币问题.js
```javascript
/**
 * dp动态规划问题，硬币问题
 * 假设有 1 元，3 元，5 元的硬币若干（无限），现在需要凑出 11 元，问如何组合才能使硬币的数量最少？
 * @param {*} arr
 * 将问题化解为1元钱需要几个硬币，2元钱需要几个硬币，以此类推，每个的结论都依赖前面的结论
 * 将问题化解为小问题，并且每一步解决的是同一个问题
 */

function moneyCount(arr, aim) {
    if (!arr || arr.length < 1) return 0
    let dp = []
    for (let i = 0; i <= aim; i++) {
        dp[i] = i
        for (let j = 0; j < arr.length; j++) {
            if (i >= arr[j] && dp[i - arr[j]] + 1 < dp[i]) {
                dp[i] = dp[i - arr[j]] + 1
            }
        }
    }
}

// 将给定的字符串按照以下要求处理后输出
// 1. 不能包含连续超过三个字母的，应该变为两个  如heloooo -> heloo
// 2. helloo -> hello  hellooaa -> helloaa(从到右); 前面的意思是，不能有连续的超过两个字母的出现，应该将连续的两个当中的后者变为一个字母

// 有n个人参加比赛，比赛结束后每个人得到一个分数，现在所有人排成一圈(第一个和第N个排成一排)
// 要求: 1. 如果某个人的分数比左右的都高，那么奖品的数量也要比左右的人多
// 2. 每个人至少得到一个奖品
// 问最少需要混呗多少个奖品

// 给定n表示有几段绳子，以及a[i]地i根绳子的长度。绳子可以裁剪，
// 我们给定一个M,表示我们需要的等长的绳子数量，求我们可以将n裁剪成M段的时候，M段绳子的最大长度

// var str = 'hellooooffffvvvvv'
// // 第一步将所有超过三个的字母变成两个
// var middleStr = str.replace(/([a-zA-Z])\1\1*/g, function (match) {
//     return match[0] + match[1]
// })
// // 第二步处理连续的情况
// var resultStr = middleStr.replace(/([a-zA-Z])\1([a-zA-Z])\2/g, function (match, a, b) {
//     return a + a + b
// })

// console.log(resultStr)

```
## 累加和为给定值的最长子数组.js
```javascript
// 给定一个数组 arr ,给定一个目标值 aim, 求改数组中和为 aim 的最长的数组长度
// 思路：从 m ~ n  的累加和为 k, 如果要求和为 aim 的数组，那么只需要求 m ~ n 之间和为 k - aim 的范围，如果结尾位置为 x，
// 那么从 x + 1 ~ n就是何为 aim 的数组

function maxLength(arr, aim) {
    if (!arr || arr.length === 0) return
    let newMap = new Map()
    // 给定一个初始值，以 -1 位置结尾的数组和为 0
    map.put(0, -1)
    let len = 0
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
        if (newMap.get(sum - k)) {
            len = Math.max(i - map.get(sum - k), len)
        }
        if (!newMap.get(sum)) {
            // 每次把当前位置的 sum 放入到newMap当中，并且只放最早出现的，如果有了就不再更新
            newMap.set(sum, i)
        }
    }
    return len
}

// 扩展：
// 1. 给定一个数组，求奇数和偶数个数相等的最长的子数组
// 思路：奇数变为 1, 偶数变为 -1, 求何为 0 的最长子数组
function maxLengthOddEvenArr(arr) {
    arr = arr.map(v => {
        return v % 2 === 1 ? -1 : 1
    })
    let map = new Map()
    map.set(0, -1)
    let maxLen = 0, sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
        if (map.get(sum - 0)) {
            maxLen = Math.max(maxLen, i - map.get(sum - 0))
        }
        if (!map.get(sum)) {
            map.set(sum, i)
        }
    }
    return maxLen
}
// 2. 一个数组中只有 0, 1, 2, 求一个数组中 1 和 2 长度相同的最长子数组长度为多少
// 思路：1 还是 1，2变 -1, 求何为 0 的最长子数组

// 3. 一个数组互相异或最终为 0为我们给定的数组。给定一个数组，求一种分割方法，使得分割出来的的所有数组中满足前面给定条件的数组最多。
// 思路：异或满足交换律，且 0 ^ n = n, n ^ n = 0。使用动态规划。
function maxLength(arr) {
    if (!arr || arr.length === 0) return
    let dp = []
    let newMap = new Map()
    // 给定一个初始值，以 -1 位置结尾的数组和为 0
    map.put(0, -1)
    let ans = 0 // 结果
    let xor = 0 // 当前的异或和
    for (let i = 0; i < arr.length; i++) {
        xor ^= arr[i]
        // 如果该异或值出现过
        if (newMap.get(xor)) {
            let pre = newMap.get(xor)
            //0 ~ i, 当前 i 的 xor 和 pre 的 xor 相等，所以 pre ~ i 这一段的异或和为 0。
            // 如果位置是 -1 ，那么当前的 dp[i] 为 1, 即从头开始的位置的开始到当前的 i 这一段
            // 如果不是 -1, 那么 从 pre ~ i 这一段可以划分为一段，因为他们的异或和为 0, 所以当前的 dp[i] = dp[pre] + 1
            dp[i] = pre === -1 ? 1 : (dp[pre] + 1)

        // 如果当前 i 位置的值没有出现过
        } else {
            // 如果没有出现过，而 xor 的和又为 0，那么当前的 dp[i] 为 1
            if (xor === 0) {
                dp[i] = 1
            } else {
            // 如果 xor 和不为 0，那么他的 dp[i] 和前面一个的 dp 值相等
                dp[i] =  dp[i - 1]
            }
        }
        if (i > 0) {
            //  去比较如果前面存在过相同的 xor 的情况和和不存在的情况两种，谁的值最大，取大的那个值
            dp[i] = Math.max(dp[i - 1], dp[i])
        }
        // 每一次都要更新当前的异或和，这里不是只存第一次的，而是存最后一次的，后面的会把前面相同的 xor 为key 的覆盖掉
        map.put(xor, i)
        // 记录最大的值
        ans = Math.max(ans, dp[i])
    }
    return ans
}
```
## 累加和最长子数组.js
```javascript
// 给定一个数组 arr, 全是正数；一个整数 aim，求累加和等于 aim 的最长子数组。
// 要求额外空间复杂度 O(1), 时间复杂度O(N)

// 思路：定义两个指正 L、R，当L ~ R中的累加和小于等于 aim 的时候R++，当等于时，记录相关的数据
// 当窗口类累加和大于 aim 的时候 L++
// 这里可以使用双指针的原因是，全部是正数，R 往右 sum 一定增加， L 往右 sum 一定减小。

function getMaxLength(arr, aim) {
    if (!arr || arr.length === 0 || aim <= 0) {
        return 0
    }
    let L = 0,
        R = 0,
        sum = arr[0],
        len = 0
    while (R < arr.length) {
        if (sum == aim) {
            len = Math.max(len, R - L + 1)
            sum -= arr[L++]
        } else if (sum < aim) {
            R++;
            if (R === arr.length) break
            sum += arr[R]
        } else {
            sum -= arr[L++]
        }
    }
    return len
}

/**
 * 例 2
 * 给定一个数组 arr, 值可正，可负，可0；一个整数 aim，求累加和小于等于 aim 的最长子数组，时间复杂度O(N)
 * 思路：定义两个数组，min_sum 表示每一个位置的最小累加和，min_sum_index 表示每一个位置的最小累加和累加到的下标位置。
 * 从后往前遍历，对于每一个位置，只需要决定是否需要使用下一个位置的最小累加和以及不使用后面的部分(dp)，然后得到前面两个数组的信息。
 *
 * 然后从头遍历 min_sum, 定义一个 L， 一个 R, 每一个位置表示当前位置的最小累加和。并有对应的累加到的 index 在 min_sum_index 中。
 * 如果当前位置的最小累加和小于 aim ，那么更具其对应的累加和到达的位置的下一个位置的最小累加和，再累加起来，看是否大于 aim ,依次往下，知道大于 aim。
 * 每遍历一次，就会得到一个以该位置的开头的最长子数组，累加和小于等于 aim。
 * 当一个位置遍历完了之后，sum - L 位置的值，然后 L++, 知道 前面说到的下一个位置的最小累加和能够加进来为止。
 * 思想：去除不是最优的解。
 */

function maxLengthAwesom(arr, aim) {
    if (!arr || arr.length < 1) {
        return 0
    }
    let minSum = []
    let minIndex = []
    minSum[arr.length - 1] = arr[arr.length - 1]
    minIndex[arr.length - 1] = arr.length - 1
    for(let i = arr.length - 2; i >= 0; i--) {
        if (minSum[i + 1] < 0) {
            minSum[i] = minSum[i + 1] + arr[i]
            minIndex[i] = minIndex[i + 1]
        } else {
            minSum[i] = arr[i]
            minIndex[i] = i
        }
    }
    let maxLen = 0, L = 0, R = 0, sum = 0
    for (let L = 0; L < arr.length; L++) {
        while (sum + minSum[R] <= aim && R < arr.length) {
            sum += minSum[R]
            R = minIndex[R] + 1
        }
        sum = sum - R > L ? arr[L] : 0
        maxLen = Math.max(maxLen, R - L)
        R = Math.max(R, L + 1)
    }
    return maxLen
}
```