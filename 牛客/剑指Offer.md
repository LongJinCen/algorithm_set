# 剑指Offer
## 1-数组-二维数组查找.js
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```javascript
function Find(target, array) {
    let x = array[0].length - 1,
        y = array.length - 1
    let j = x,
        i = 0
    let result = false
    while(j >= 0 && i <= y) {
        if(target > array[i][j]) {
            i++
            continue
        } else if(target < array[i][j]) {
            j--
            continue
        } else {
            result = true
            break
        }
    }
    return result
}
```
## 2-字符串-空格替换
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
```javascript
function replaceSpace(str) {
    return str.replace(/\s+?/g, '%20')
}
```
## 3-链表-从尾到头打印链表
输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。
```javascript
function printListFromTailToHead(head) {
    let result = []
    while(head) {
        result.push(head.val)
        head = head.next
    }
    return result.reverse()
}
```
## 4-树-重建二叉树
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
> 思路: 通过先序遍历，将中序划分为两部分，左子树和右子树，然后再根据左子树和右子树的节点数目，去划分先序遍历的左右子树的遍历顺序，再分别递归左右子树
```javascript
function reConstructBinaryTree(pre, vin) {
    console.log(pre, vin)
    if(pre.length === 0) {
        return null
    }
    if (pre.length === 1) {
        return {
            val: pre[0],
            left: null,
            right: null
        }
    }
    let root = pre[0]
    let rootIndexVin = vin.indexOf(root)
    let vinLeftSequence = vin.slice(0, rootIndexVin),
        vinRightSequence = vin.slice(rootIndexVin + 1, vin.length)
    pre.shift()
    let preLeftSequence = pre.slice(0, vinLeftSequence.length),
        preRightSequence = pre.slice(vinLeftSequence.length, pre.length)
    let left = reConstructBinaryTree(preLeftSequence, vinLeftSequence)
    let right = reConstructBinaryTree(preRightSequence, vinRightSequence)
    return {
        val: root,
        left: left,
        right: right
    }
}
var result = reConstructBinaryTree([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6])
```
## 5-栈和队列-用两个栈实现队列
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
```javascript
var stack1 = [], stack2 = []
function push(node) {
    if(stack2.length > 0) {
        for (let i = 0; i < stack2.length; i++) {
            stack1.push(stack2.pop())
        }
    }
    stack1.push(node)
}
function pop() {
    if(stack1.length > 0) {
        for (let i = 0; i < stack1.length; i++) {
            stack2.push(stack1.pop())
        }
    }
    return stack2.pop()
}
```
## 6-查找和排序-旋转数组的最小数字
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
```javascript
function minNumberInRotateArray(rotateArray)
{
    return Math.min(...rotateArray)
}
```
## 7-递归和循环-斐波那契数列
大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。n<=39
```javascript
var dp = []
function Fibonacci(n) {
    if (dp[n]) return dp[n]
    if (n === 0) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    dp[n] = Fibonacci(n - 1) + Fibonacci(n - 2)
    return dp[n]
}
console.log(Fibonacci(39))
```
## 8-递归和循环-跳台阶
一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
```javascript
// 暴力递归方法
function jumpFloor(number) {
    var totalWay = 0
    function jump(current, total) {
        if(current === total) {
            totalWay++
        }
        if(current > total) {
            return
        }
        jump(current + 1, total)
        jump(current + 2, total)
    }
    return jump(0, number)
}

// 用动态规划改造 暴力递归
function jumpFloor(number) {
    var dp = []
    function jump(current, total) {
        if(dp[current]) return dp[current]
        if (current === total) {
            return 1
        }
        if (current > total) {
            return 0
        }
        dp[current] = jump(current + 1, total) + jump(current + 2, total)
        return dp[current]
    }
    return jump(0, number)
}
console.log(jumpFloor(4))
```
## 9-递归和循环-变态跳台阶
一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
```javascript
function jumpFloorII(number) {
    var dp = new Array(number + 2).fill(-1)
    function jump(current, total) {
        if(dp[current] >= 0) return dp[current]
        if (current === total) {
            return 1
        }
        if (current > total) {
            return 0
        }
        if(dp[current] < 0) {
            dp[current] = 0
        }
        for (let i = 1; i <= number; i++) {
            dp[current] += jump(current + i, total)
        }
        return dp[current]
    }
    return jump(0, number)
}
```
## 10-递归和循环-矩形覆盖.js
我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？斐波拉数列的解法: fn = f(n - 1） + f(n - 2)
```javascript
var dp = []
function rectCover(n) e{
    // write code here
    if(dp[n]) return dp[n]
    if (n <= 2) {
        return n
    }
    dp[n] = rectCover(n - 1) + rectCover(n - 2)
    return dp[n]
}
```
## 11-位运算-二进制中1的个数.js
输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示
> 原码: 将一个数直接转换为二进制，正数的原码最高位为0，负数的最高位原码为1
> 反码、补码: 正数的反码和补码与原码相同，负数的反码是符号位不变，其他位取反，补码是在反码的基础上加一
```javascript
function NumberOf1(n)
{
    // write code here
    var count = 0
    while(n!==0) {
        count++
        count = count & (count - 1)
    }
    return count
}

// 利用位移, 一次与
function NumberOf1(n){
    var count = 0,
        flag = 1
    while(flag) {
        if(flag & n) count++
        flag = flag << 1
    }
    return count
}
```
## 12-代码的完整性-数值的整数次方.js
给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
```javascript
function Power(base, exponent)
{
    // write code here
    return Math.pow(base, exponent)
}
```
## 13-代码的完整性-调整数组顺序使奇数位于偶数前面.js
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。
```javascript
function reOrderArray(array){
    let oddArr = [], eventArr = []
    array.forEach(value => {
        value % 2 === 1 ? oddArr.push(value) : eventArr.push(value)
    });
    return oddArr.concat(eventArr)
}
```
## 14-代码的鲁棒性-链表中倒数第k个结点.js
输入一个链表，输出该链表中倒数第k个结点。
```javascript
function FindKthToTail(head, k) {
    if(!head || k < 0) return
    let listValueArr = []
    while(head) {
        listValueArr.push(head)
        head = head.next
    }
    return listValueArr[listValueArr.length - k]
}
```
## 15-代码的鲁棒性-反转链表.js
输入一个链表，反转链表后，输出新链表的表头。
```javascript
function ReverseList(pHead) {
    return reverseList(null, pHead)
}

function reverseList(pre, cur) {
    if(!cur) return pre
    let head = reverseList(cur, cur.next)
    cur.next = pre
    return head
}
```
## 16-代码的鲁棒性-合并两个排序的链表.js
输入两个÷单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
```javascript
function Merge(pHead1, pHead2) {
    if(!pHead1) return pHead2
    if(!pHead2) return pHead1
    let minHead = head = pHead1,
        otherHead = pHead2;
    if (pHead1.val >= pHead2.val) {
        minHead = head = pHead2
        otherHead = pHead1
    }
    while(minHead && otherHead) {
        while(minHead.next && (minHead.next.val < otherHead.val)) {
            minHead = minHead.next
        }
        if(!minHead.next) break
        let temp = otherHead
        otherHead = otherHead.next

        temp.next = minHead.next
        minHead.next = temp
    }
    if(otherHead) {
        minHead.next = otherHead
    }
    return head
}

function Merge(pHead1, pHead2) {
    if(!pHead1) return pHead2
    if(!pHead2) return pHead1
    let newArr = []
    while(pHead1 && pHead2) {
        if(pHead1.val <= pHead2.val) {
            newArr.push(pHead1)
            pHead1 = pHead1.next
        } else {
            newArr.push(pHead2)
            pHead2 = pHead2.next
        }
    }
    while(pHead1) {
        newArr.push(pHead1)
        pHead1 = pHead1.next
    }
    while(pHead2) {
        newArr.push(pHead2)
        pHead2 = pHead2.next
    }
    for (let i = 0; i < newArr.length - 1; i++) {
        newArr.next = newArr[i + 1]
    }
    return newArr[0]
}
```
## 17-代码的鲁棒性-树的子结构.js
输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）
```javascript
// 子树
function HasSubtree(pRoot1, pRoot2) {
    if(!pRoot1 || !pRoot2) {
        return false
    }
    let preRoot1 = preOrder(pRoot1)
    let middRoot1 = middOrder(pRoot1)
    let preRoot2 = preOrder(pRoot2)
    let middRoot2 = middOrder(pRoot2)
    return (preRoot1.indexOf(preRoot2) !== -1) && (middRoot1.indexOf(middRoot2) !== -1)
}

function preOrder (node) {
    if(!node) return '#'
    return node.val + '_' + preOrder(node.left) + '_' + preOrder(node.right)
}

function middOrder (node) {
    if(!node) return '#'
    return middOrder(node.left) + '_' + node.val + '_' + middOrder(node.right)
}

// 子结构
function HasSubtree(pRoot1, pRoot2) {
    if(!pRoot1 || !pRoot2) {
        return false
    }
    let result = false
    function find(pRoot1, pRoot2) {
        if(result || !pRoot1) return
        if(pRoot1.val === pRoot2.val) {
            result = compare(pRoot1, pRoot2)
        }
        find(pRoot1.left, pRoot2)
        find(pRoot1.right, pRoot2)
    }
    function compare(pRoot1, pRoot2) {
        if(!pRoot1 && !pRoot2) return true
        if(!pRoot2) return true
        if(!pRoot1) return false
        if(pRoot1.val !== pRoot2.val) return false
        return compare(pRoot1.left, pRoot2.left) && compare(pRoot1.right, pRoot2.right)
    }
    find(pRoot1, pRoot2)
    return false
}
```
## 18-面试思路-二叉树的镜像.js
操作给定的二叉树，将其变换为源二叉树的镜像。
```javascript
function Mirror(root) {
    if(!root) return null
    exchange(root, root.left)
    exchange(root, root.right)
    swap(root, root.left, root.right)
    return root
}

function exchange(parent, cur) {
    if(!cur) return
    exchange(cur, cur.left)
    exchange(cur, cur.right)
    swap(cur, cur.left, cur.right)
}

function swap(root, left, right) {
    let temp = left
    root.left = right
    root.right = temp
}
```
## 19-画图让抽象形象化-顺时针打印矩阵.js
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.
```javascript
function printMatrix(matrix) {
    let result = []
    let leftTopX = 0, leftTopY = 0;
    let rightBottomX = matrix.length - 1, rightBottomY = matrix[0].length - 1
    while(leftTopX <= rightBottomX && leftTopY <= rightBottomY) {
        printAround(matrix, result, leftTopX, leftTopY, rightBottomX, rightBottomY)
        leftTopX++
        leftTopY++
        rightBottomX--
        rightBottomY--
    }
    return result
}

function printAround(matrix, result, x1, y1, x2, y2) {
    if(x1 === x2){
        for (let i = y1; i <= y2; i++) {
            result.push(matrix[x1][i])
        }
        return
    }
    if(y1 === y2) {
        for (let i = x1; i <= x2; i++) {
            result.push(matrix[i][y1])
        }
        return
    }
    let i = x1, j = y1
    while(j <= y2) {
        result.push(matrix[i][j])
        j++
    }
    j--
    i++
    while(i <= x2) {
        result.push(matrix[i][j])
        i++
    }
    i--
    j--
    while(j >= y1) {
        result.push(matrix[i][j])
        j--
    }
    j++
    i--
    while(i > x1) {
        result.push(matrix[i][j])
        i--
    }
}
```
## 2-字符串-空格替换.js
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
```javascript
function replaceSpace(str) {
    return str.replace(/\s+?/g, '%20')
}
```
## 20-举例让抽象具体化-包含min函数的栈.js
定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
```javascript
var arr = [];
function push(node) {
    arr.push(node);
}
function pop() {
    arr.pop();
}
function top() {
    return arr[arr.length - 1];
}
function min() {
    return Math.min.apply(Math, arr);
}
```
## 21-举例让抽象具体化-栈的压入、弹出序列.js
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。
假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）
```javascript
function IsPopOrder(pushV, popV) {
    let stack = []
    for(let i = 0; i < pushV.length; i++) {
        stack.push(pushV[i])
        if(pushV[i] === popV[0]) {
            while(stack[stack.length-1]===popV[0]) {
                stack.pop()
                popV.shift()
            }
        }
    }
    if(stack.length === 0) {
        return true
    }
    return false
}
```
## 22-举例让抽象具体化-从上往下打印二叉树.js
从上往下打印出二叉树的每个节点，同层节点从左至右打印。
```javascript
function PrintFromTopToBottom(root) {
    if(!root) return []
    let queue = [root], result = []
    let head = tail = 0
    while(head <= tail) {
        let node = queue[head]
        result.push(node.val)
        if(node.left) {
            queue.push(node.left)
            tail++
        }
        if(node.right) {
            queue.push(node.right)
            tail++
        }
        head++
    }
    return result
}
```
## 23-举例让抽象具体化-二叉搜索树的后序遍历序列.js
输入一个整数数组，判断该数组是不是某     二叉搜索树    的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同
```javascript
function VerifySquenceOfBST(sequence) {
    if(sequence.length === 0) return false
    return isSearchTree(sequence, 0, sequence.length - 1)
}

function isSearchTree(arr, left, right) {
    if(left >= right) return true
    let i = left
    while(arr[i] < arr[right] && i < right) {
        i++
    }
    let result = isSearchTree(arr, left, i - 1) && isSearchTree(arr, i, right - 1)
    for (let j = i; j < right; j++) {
        if(arr[j] < arr[right]){
            result =  false
            break
        }
    }
    return result
}
```
## 24-举例让抽象具体化-二叉树中和为某一值的路径.js
输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
> (注意: 在返回值的list中，数组长度大的数组靠前)
```javascript
function FindPath(root, expectNumber) {
    let result = []
    function goWay(root, cur, expectNumber, path) {
        if(!root) return
        if(!root.left && !root.right) {
            if(cur + root.val === expectNumber){
                path.push(root.val)
                result.push(path)
            }
            return
        }
        path.push(root.val)
        goWay(root.left, cur + root.val, expectNumber, path.concat([]))
        goWay(root.right, cur + root.val, expectNumber, path.concat([]))
    }
    goWay(root, 0, expectNumber, [])
    result.sort(function(a, b) {
        if (a.length < b.length) {
            return 1
        } else {
            return -1
        }
    })
    return result
}
```
## 25-分解让复杂问题简单-复杂链表的复制.js
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。
>（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
```javascript
function Clone(pHead) {
    let newHead1 = newHead2 = pHead
    if(!pHead) return null
    while(pHead) {
        let node = new RandomListNode(pHead.label)
        node.next = pHead.next
        pHead.next = node
        pHead = pHead.next.next
    }
    while(newHead1) {
        if(newHead1.random) {
            newHead1.next.random = newHead1.random.next
        } else {
            newHead1.next.random = newHead1.random
        }
        newHead1 = newHead1.next.next
    }

    let head = newHead2.next

    while(newHead2) {
        let node = newHead2.next
        newHead2.next = newHead2.next.next
        newHead2 = newHead2.next
        if(newHead2) {
            node.next = newHead2.next
        } else {
            node.next = null
        }
    }

    return head
}
```
## 26-分解让复杂问题简单-二叉搜索树与双向链表.js
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。
```javascript
function Convert(pRootOfTree) {
    if(!pRootOfTree) return null
    let linkList = []
    function converTreeToLink(curNode) {
        if(!curNode) return
        converTreeToLink(curNode.left, curNode)
        linkList.push(curNode)
        converTreeToLink(curNode.right, curNode)
    }
    converTreeToLink(pRootOfTree)
    linkList[0].left = null
    linkList[linkList.length - 1].right = null
    for (let i = 0; i < linkList.length - 1; i++) {
        linkList[i].right = linkList[i + 1]
        linkList[i + 1].left = linkList[i]
    }
    return linkList[0]
}
```
## 27-分解让复杂问题简单-字符串的排列.js
输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
> 去重: 当不在第一个位置且头部和后面的值相等时，不进行交换
```javascript
function Permutation(str) {
    if(!str) return ''
    let result = []
    function Permutation1(str, start, end) {
        if (start >= end) {
            result.push(str)
            return
        }
        for (let i = start; i <= end; i++) {
            if(i !== start && str[start] === str[i]) continue
            let newStr = swap(str, start, i)
            Permutation1(newStr, start + 1, end)
        }
    }
    Permutation1(str, 0, str.length - 1)
    return result
}
function swap (str, i, j) {
    str = str.split('')
    let temp = str[i]
    str[i] = str[j]
    str[j] = temp
    return str.join('')
}
const result = Permutation('aa')
console.log(result)
```
## 28-时间效率-数组中出现次数超过一半的数字.js
数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组 {1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
```javascript
function MoreThanHalfNum_Solution(numbers) {
    let len = numbers.length
    if(len === 0) return 0
    if(len === 1) return 1
    let middle = Math.floor(len / 2),
        middleValue = numbers[middle]
    let total = 0
    for (let i = 0; i < len; i++) {
        if(numbers[i] === middleValue) total++
    }
    if(total > middle) {
        return 2
    } else {
        return 0
    }
}
```
## 29-时间效率-最小的K个数.js
输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。
```javascript
function GetLeastNumbers_Solution(input, k) {
    if(k <= 0 || input.length === 0 || k > input.length) return []
    let result = []
    for (let i = 0; i < input.length - 1; i++) {
        if(result.length >= k) break
        let minIndex = i
        for (let j = i + 1; j < input.length; j++) {
            if(input[j] < input[minIndex]) {
                minIndex = j
            }
        }
        let temp = input[minIndex]
        input[minIndex] = input[i]
        input[i] = temp
        result.push(temp)
    }
    if(k === input.length){
        return input
    }
    return result
}
```
## 3-链表-从尾到头打印链表.js
输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。
```javascript
function printListFromTailToHead(head) {
    let result = []
    while(head) {
        result.push(head.val)
        head = head.next
    }
    return result.reverse()
}
```
## 30-时间效率-连续子数组的最大和.js
HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。今天测试组开完会后,他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,当向量全为正数的时候,问题很好解决。但是,如果向量中包含负数,是否应该包含某个负数,并期望旁边的正数会弥补它呢？例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)
```javascript
function FindGreatestSumOfSubArray(array) {
    if(array.length === 0) return 0
    let dp = [], maxValue = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < array.length; i++) {
        if(i === 0) {
            dp[i] = array[i]
            continue
        }
        dp[i] = dp[i - 1] + array[i] > array[i] ? dp[i - 1] + array[i] : array[i]
        maxValue = maxValue > dp[i] ? maxValue : dp[i]
    }
    console.log(dp)
    return maxValue
}
```
## 31-时间效率-整数中1出现的次数（从1到n整数中1出现的次数).js
求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。
```javascript
function NumberOf1Between1AndN_Solution(n) {

}

function computeOneNumber(num) {
    
}
```
## 32-时间效率-把数组排成最小的数.js
输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
```javascript
function PrintMinNumber(numbers) {
    if(numbers.length === 0) return ""
    let minValue = Number.MAX_SAFE_INTEGER
    function minStr(str, numbers, start, end) {
        if (start >= end) {
            str = str + numbers[start]
            let strToNumber = +str
            minValue = minValue < strToNumber ? minValue : strToNumber
        }
        for (let i = start + 1; i <= end; i++) {
            let newNubmers = [...numbers]
            if (newNubmers[start] === newNubmers[i]) {
                continue
            }
            let value1 = newNubmers[start] + '' + newNubmers[i],
                value2 = newNubmers[i] + '' + newNubmers[start]
            if (+value1 > +value2) {
                let temp = newNubmers[start]
                newNubmers[start] = newNubmers[i]
                newNubmers[i] = temp
            }
            minStr(str + newNubmers[start], newNubmers, start + 1, end)
        }
    }
    minStr('', numbers, 0, numbers.length - 1)
    return minValue
}
```
## 33-时间空间效率的平衡-丑数.js
把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含质因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。首先除2，直到不能整除为止，然后除5到不能整除为止，然后除3直到不能整除为止。最终判断剩余的数字是否为1，如果是1则为丑数，否则不是丑数。
```javascript
function GetUglyNumber_Solution(index) {
    if(index <= 0) return 0
    let result = [1]
    let t1 = t2 = t3 = 0
    for (let i = 1; i < index; i++) {
        let value1 = result[t1] * 2,
            value2 = result[t2] * 3,
            value3 = result[t3] * 5
        result[i] = Math.min(value1, value2, value3)
        if(value1 === result[i]) t1++
        if(value2 === result[i]) t2++
        if(value3 === result[i]) t3++
    }
    return result[index - 1]
}

function GetUglyNumber_Solution(index) {
    if (index <= 0) return []
    let dp = [], total = 0, result
    for (let i = 1; ; i++) {
        if (judge(i)) {
            dp[i] = true
            total++
        } else {
            dp[i] = false
        }
        if (total === index) {
            result = i
            break
        }
    }
    function judge(index) {
        while (index % 2 === 0) {
            if(dp[index] !== undefined) return dp[index]
            index = index / 2
        }
        while (index % 3 === 0) {
            if(dp[index] !== undefined) return dp[index]
            index = index / 3
        }
        while (index % 5 === 0) {
            if(dp[index] !== undefined) return dp[index]
            index = index / 5
        }
        if (index === 1) return true

        return false
    }
    return result
}
```
## 34-第一个只出现一次的字符.js
在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.
```javascript
function FirstNotRepeatingChar(str) {
    if (str.length <= 0) return -1
    let memory = {

    }
    let res = -1
    for (let i = 0; i < str.length; i++) {
        if (!memory[str[i]]) {
            memory[str[i]] = 1
        } else {
            memory[str[i]] += 1
        }
    }
    for (let j = 0; j < str.length; j++) {
        if (memory[str[j]] === 1) {
            res = j
            break
        }
    }
    return res
}
```
## 35-数组中的逆序对.js
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P%1000000007
```javascript
function InversePairs(data) {
  function mergeSort(data, left, right) {
    if (left >= right) return 0
    let middle = Math.floor((left + right) / 2)
    let L = mergeSort(data, left, middle)
    let R = mergeSort(data, middle + 1, right)
    return L + R + outSort(data, left, right)
  }
  function outSort(data, left, right) {
    let middle = Math.floor((left + right) / 2)
    let res = [], T = 0
    let i = middle, j = right
    while (i >= left && j >= middle + 1) {
      if (data[i] > data[j]) {
        T = T + (j - (middle + 1)) + 1
        res.push(data[i--])
      } else {
        res.push(data[j--])
      }
    }
    while (i >= left) {
      res.push(data[i--])
    }
    while (j >= middle + 1) {
      res.push(data[j--])
    }
    for (let k = left, t = res.length - 1; k <= right; k++) {
      data[k] = res[t--]
    }
    return T
  }
  return mergeSort(data, 0, data.length - 1)
}
```
## 36-两个链表的第一个公共节点.js
```javascript
function FindFirstCommonNode(pHead1, pHead2) {
    const map = new Map()
    let res = null
    while (pHead1 != null) {
        map.set(pHead1, true)
        pHead1 = pHead1.next
    }
    while (pHead2 != null) {
        if (map.get(pHead2)) {
            res = pHead2
            break
        }
        pHead2 = pHead2.next
    }
    return res
}
```
## 37-数字在排序数组中出现的次数.js
```javascript
function GetNumberOfK(data, k) {
    let left = 0, right = data.length - 1, len = data.length - 1
    let middle = Math.floor((left + right) / 2)
    while (left < right) {
        if (k > data[middle]) {
            left = middle + 1
        } else if (k < data[middle]) {
            right = middle - 1
        } else {
            break
        }
        middle = Math.floor((left + right) / 2)
    }
    let res = 0, goLeft = middle, goRight = middle + 1
    while (goLeft >= 0 && data[goLeft] === k) {
        res++
        goLeft--
    }
    while (goRight <= len && data[goRight] === k) {
        res++
        goRight++
    }
    return res
}
console.log(GetNumberOfK([1, 2, 3, 4, 5, 5, 6], 5))
```
## 38-二叉树的深度.js
```javascript
function TreeDepth(pRoot) {
    function goDeep(root, pathDeep) {
        if (root === null) return pathDeep
        return Math.max(
            goDeep(root.left, pathDeep + 1),
            goDeep(root.right, pathDeep + 1)
        )
    }
    return goDeep(pRoot, 0)
}
```
## 39-平衡二叉树.js
```javascript
function IsBalanced_Solution(pRoot) {
    function process(pRoot) {
        if (pRoot === null) {
            return {
                deep: 0,
                isbalanced: true
            }
        }
        let leftInfo = process(pRoot.left)
        if (!leftInfo.isbalanced) {
            return {
                deep: 0,
                isbalanced: false
            }
        }
        let rightInfo = process(pRoot.right)
        if (!rightInfo.isbalanced) {
            return {
                deep: 0,
                isbalanced: false
            }
        }
        return {
            deep: Math.max(leftInfo.deep, rightInfo.deep) + 1,
            isbalanced: Math.abs(leftInfo.deep - rightInfo.deep) <= 1
        }
    }
    return process(pRoot).isbalanced
}
```
## 40-数组中只出现一次的数字.js
一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。
```javascript
function FindNumsAppearOnce(array) {
    let res = []
    let hash = {}
    for (let i = 0; i < array.length; i++) {
        if (!hash[array[i]]) {
            hash[array[i]] = 1
        } else {
            hash[array[i]] += 1
        }
    }
    for (const key in hash) {
        if (hash.hasOwnProperty(key)) {
            hash[key] === 1 && res.push(key)
        }
    }
    return res
}
```
## 41-和为S的连续正数数组.js
输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序
```javascript
```
## 42-和为S的连续正数数列.js
输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序
```javascript
function FindContinuousSequence(sum) {
    if (sum <= 0) {
        return []
    }
    let res = []
    let L = R = 1,
        cur = 0
    while (L < sum && R < sum && L <= R) {
        while (cur < sum && L < sum && R < sum && L <= R) {
            cur += R
            R++
        }
        if (cur === sum) {
            let sigal = []
            for (let i = L; i < R; i++) {
                sigal.push(i)
            }
            res.push(sigal)
        }
        cur -= L
        L++
    }
    return res
}
console.log(FindContinuousSequence(100))
```
## 43-何为S的两个数字.js
输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的
```javascript
function FindNumbersWithSum(array, sum) {
  if (array.length <= 1) {
    return []
  }
  let L = 0,
    R = array.length - 1,
    cur = array[L] + array[R],
    res = [],
    minMul = Number.MAX_SAFE_INTEGER
  while (L < R) {
    if (cur < sum) {
      cur -= array[L++]
      cur += array[L]
    } else if (cur === sum) {
      if (array[L] * array[R] < minMul) {
        minMul = array[L] * array[R]
        res = [array[L], array[R]]
      }
      cur -= array[R--]
      cur += array[R]
    } else {
      cur -= array[R--]
      cur += array[R]
    }
  }
  return res
}
```
## 44-左旋转字符串.js
汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的字符序列S，请你把其循环左移K位后的序列输出。例如，字符序列S=”abcXYZdef”,要求输出循环左移3位后的结果，即“XYZdefabc”。是不是很简单？OK，搞定它
```javascript
function LeftRotateString(str, n) {
    if (!str) {
        return ''
    }
    let len = str.length
    let dis = n % len
    let res = ''
    if (dis === 0) {
        return str
    }
    for (let i = dis; i < str.length; i++) {
        res += str[i]
    }
    for (let i = 0; i < dis; i++) {
        res += str[i]
    }
    return res
}
```
## 45-翻转单词顺序列.js
牛客最近来了一个新员工Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。同事Cat对Fish写的内容颇感兴趣，有一天他向Fish借来翻看，但却读不懂它的意思。例如，“student. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了，正确的句子应该是“I am a student.”。Cat对一一的翻转这些单词顺序可不在行，你能帮助他么？
```javascript
function ReverseSentence(str) {
    return str.split(' ').reverse().join(' ')
}
```
## 46-扑克牌顺子.js
LL今天心情特别好,因为他去买了一副扑克牌,发现里面居然有2个大王,2个小王(一副牌原本是54张^_^)...他随机从中抽出了5张牌,想测测自己的手气,看看能不能抽到顺子,如果抽到的话,他决定去买体育彩票,嘿嘿！！“红心A,黑桃3,小王,大王,方片5”,“Oh My God!”不是顺子.....LL不高兴了,他想了想,决定大\小 王可以看成任何数字,并且A看作1,J为11,Q为12,K为13。上面的5张牌就可以变成“1,2,3,4,5”(大小王分别看作2和4),“So Lucky!”。LL决定去买体育彩票啦。 现在,要求你使用这幅牌模拟上面的过程,然后告诉我们LL的运气如何， 如果牌能组成顺子就输出true，否则就输出false。为了方便起见,你可以认为大小王是0。
```javascript
function IsContinuous(numbers) {
    if (numbers.length <= 0) {
        return false
    }
    const mapObj = {
        'A': 1,
        'J': 11,
        'Q': 12,
        'K': 13,
    }
    let numStr = [],
        king = []
    for (let i = 0; i < numbers.length; i++) {
        if (+numbers[i] === 0) {
            king.push(+numbers[i])
            continue
        }
        let num = mapObj[numbers[i]] ? +mapObj[numbers[i]] : +numbers[i]
        let numStrLen = numStr.length,
            k = numStrLen - 1
        if (numStrLen === 0) {
            numStr.push(num)
        } else {
            while (num < numStr[k] && k >= 0) {
                numStr[k + 1] = numStr[k]
                k--
            }
            numStr[k + 1] = num
        }
    }
    let kingLen = king.length,
        flag = true
    for (let i = 0; i < numStr.length - 1; i++) {
        if (numStr[i] + 1 === numStr[i + 1]) {
            continue
        }
        if (numStr[i] === numStr[i + 1]) {
            flag = false
            break
        }
        let diff = numStr[i + 1] - numStr[i]
        if (diff >= 2 && kingLen >= diff - 1) {
            kingLen = kingLen - (diff - 1)
        } else {
            flag = false
            break
        }
    }
    return flag
}
```
## 47-孩子们的游戏(圆圈中剩下的数).js
每年六一儿童节,牛客都会准备一些小礼物去看望孤儿院的小朋友,今年亦是如此。HF作为牛客的资深元老,自然也准备了一些小游戏。其中,有个游戏是这样的:首先,让小朋友们围成一个大圈。然后,他随机指定一个数m,让编号为0的小朋友开始报数。每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,从他的下一个小朋友开始,继续0...m-1报数....这样下去....直到剩下最后一个小朋友,可以不用表演,并且拿到牛客名贵的“名侦探柯南”典藏版(名额有限哦!!^_^)。请你试着想下,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)如果没有小朋友，请返回-1将问题分解为子问题， 对于 每一个 LastRemaining_Solution(n, m) 在当前人数为 n 的情况下，最后一个胜利者为 x，那么可以通过子问题推出父问题，fn(n + 1) = (LastRemaining_Solution(n, m) + m) % n
```javascript
function LastRemaining_Solution(n, m) {
    if (n === 0) {
        return - 1
    }
    if (n === 1) {
        return 0
    }
    return (LastRemaining_Solution(n - 1, m) + m) % n
}
```
## 48-求1+2+..+n.js
求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
```javascript
function Sum_Solution(n) {
    if (n === 1) {
        return 1
    }
    return n + Sum_Solution(n - 1)
}
```
## 49-位运算求和.js
```javascript
function Add(num1, num2) {
    // write code here

    let sum = num1;
    while (num2 != 0) {
        //a与b无进位相加
        sum = num1 ^ num2;
        num2 = (num1 & num2) << 1;
        num1 = sum;
    }
    return sum
}
```
## 50-把字符串转换为整数.js
将一个字符串转换成一个整数(实现Integer.valueOf(string)的功能，但是string不符合数字要求时返回0)，要求不能使用字符串转换整数的库函数。 数值为0或者字符串不是一个合法的数值则返回0
```javascript
function StrToInt(str) {
    // write code here
    if (str === 0 || isNaN(+str)) {
        return 0
    }
    return + str
}
```
## 51-数组中重复的数字.js
在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2
```javascript
function duplicate(numbers, duplication) {
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
    var hash = {}
    for (let i = 0; i < numbers.length; i++) {
        if (hash[numbers[i]] === undefined) {
            hash[numbers[i]] = 1
        } else {
            duplication[0] = numbers[i]
            break
        }
    }
    return duplication[0] === undefined ? false : true
}
```
## 52-构建乘机数组.js
给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法
```javascript
function multiply(array) {
    // write code here
    if (array == null) {
        return false;
    }
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        var tempArr = array.filter(function (val, idx) {
            return idx != i;
        });
        var temp = 1;
        tempArr.map(function (val) {
            temp *= val;
        });
        arr.push(temp);
    }
    return arr;
}
```
## 53-正则表达式匹配.js
请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配
```javascript
//s, pattern都是字符串
function match(s, pattern) {
    // write code here
    function process(s, pattern, sIdx, pIdx) {
        if (pIdx === pattern.length) {
            return sIdx === s.length
        }
        // 下一个不是 * 号
        if (
            pattern[pIdx + 1] !== '*' || pIdx === pattern.length - 1
        ) {
            return sIdx < s.length
                && (pattern[pIdx] === s[sIdx] || pattern[pIdx] === '.')
                && process(s, pattern, sIdx + 1, pIdx + 1)
        }
        // 下一个是 * 号
        while (sIdx < s.length && (s[sIdx] === pattern[pIdx] || pattern[pIdx] === '.')) {
            if (process(s, pattern, sIdx, pIdx + 2)) {
                return true
            }
            sIdx++
        }
        return process(s, pattern, sIdx, pIdx + 2)
    }
    return process(s, pattern, 0, 0)
}
```
## 54-表示数值的字符串.js
请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。
```javascript
//s字符串
function isNumeric(s) {
    // write code here
    return /^[+-]?\d*(\.\d+)?([Ee][+-]?\d+)?$/.test(s)
}
```
## 55-字符流中第一个不重复的字符.js
请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。
```javascript
let memory
//Init module if you need
function Init() {
    // write code here
    memory = {}
}
//Insert one char from stringstream
function Insert(ch) {
    // write code here
    if (!memory[ch]) {
        memory[ch] = {
            T: 1,
            word: ch
        }
    } else {
        memory[ch].T = memory[ch].T + 1
    }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce() {
    // write code here
    let minIndex = Number.MAX_SAFE_INTEGER,
        target = null
    for (const key in memory) {
        if (memory.hasOwnProperty(key)) {
            target = minIndex > memory[key].T ? memory[key] : target
            minIndex = target.T
        }
    }
    return minIndex === 1 ? target.word : '#'
}
```
## 56-链表中环的入口节点.js
给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead) {
    // write code here
    let map = new Map()
    while (!map.get(pHead) && pHead !== null) {
        map.set(pHead, true)
        pHead = pHead.next
    }
    return pHead
}
```
## 57-删除链表中重复的节点.js
在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead) {
    // write code here
    let stack = []
    while (pHead) {
        let len = stack.length
        if (len === 0 || (len > 0 && stack[len - 1].val === pHead.val)) {
            stack.push(pHead)
        } else {
            let flag = false
            while (len > 1 && stack[len - 1].val === stack[len - 2].val) {
                flag = true
                stack.pop()
                len--
            }
            if (flag) {
                stack.pop()
            }
            stack.push(pHead)
        }
        pHead = pHead.next
    }
    let flag = false,
        len = stack.length
    while (len > 1 && stack[len - 1].val === stack[len - 2].val) {
        flag = true
        stack.pop()
        len--
    }
    if (flag) {
        stack.pop()
    }
    for (let i = 0; i < stack.length - 1; i++) {
        stack[i].next = stack[i + 1]
    }
    if (stack.length > 0) {
        stack[stack.length - 1].next = null
    }
    return stack[0] ? stack[0] : null
}

function deleteDuplication(pHead) {
    //{1,1,2,3,3,4,5,5}
    let pre = head = {
        next: null
    }
    let last = pHead
    while (last) {
        let flag = false
        while (last && last.next && last.val === last.next.val) {
            last = last.next
            flag = true
        }
        if (flag) {
            last = last.next
            if (!last) {
                pre.next = last
            }
        }
        if (!flag) {
            pre.next = last
            pre = pre.next
            last = last.next
        }
    }
    return head.next
}
```
## 58-二叉树的下一个节点.js
给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。
```javascript
/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode) {
    // write code here
    if (!pNode) {
        return null
    }
    if (pNode.right) {
        let next = pNode.right
        while (next.left) {
            next = next.left
        }
        return next
    }
    let parent = pNode.next
    while (parent && pNode !== parent.left) {
        pNode = parent
        parent = parent.next
    }
    return parent
}
```
## 59-对称二叉树.js
请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot) {
    // write code here
    function midseq(head) {
        if (head === null) {
            return '_#'
        }
        let left = midseq(head.left)
        let right = midseq(head.right)
        return left + '_' + head.val + right
    }
    let seqs = midseq(pRoot).split('_')
    let preSeqs = seqs.join('')
    let revSeqs = seqs.reverse().join('')
    return preSeqs === revSeqs
}

function isSymmetrical(pRoot) {
    // write code here
    if(!pRoot) return true
    function process(left, right) {
        if (left === null) {
            return right === null
        }
        if (right === null) {
            return false
        }
        if (left.val !== right.val) {
            return false
        }
        return process(left.left, right.right) && process(left.right, right.left)
    }
    return process(pRoot.left, pRoot.right)
}
```
## 60-按之字形打印二叉树.js
请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印第三行按照从左到右的顺序打印，其他行以此类推。
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot) {
    // write code here
    if (!pRoot) {
        return []
    }
    let queue = [pRoot],
        n = 1,
        res = [],
        start = 0,
        end = queue.length - 1
    while (true) {
        let temp = []
        for (start; start <= end; start++) {
            temp.push(queue[start].val)
            if (queue[start].left) {
                queue.push(queue[start].left)
            }
            if (queue[start].right) {
                queue.push(queue[start].right)
            }
        }
        temp = n % 2 === 1 ? temp : temp.reverse()
        if (temp.length > 0) {
            res.push(temp)
        }
        end = queue.length - 1
        n++
        if (start > queue.length - 1) {
            break
        }
    }
    return res
}
```
## 61-把二叉树打印成多行.js
从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function Print(pRoot) {
    // write code here
    if (!pRoot) {
        return []
    }
    let queue = [pRoot],
        res = [],
        start = 0,
        end = queue.length - 1
    while (true) {
        let temp = []
        for (start; start <= end; start++) {
            temp.push(queue[start].val)
            if (queue[start].left) {
                queue.push(queue[start].left)
            }
            if (queue[start].right) {
                queue.push(queue[start].right)
            }
        }
        if (temp.length > 0) {
            res.push(temp)
        }
        end = queue.length - 1
        if (start > queue.length - 1) {
            break
        }
    }
    return res
}
```
## 62-序列化二叉树.js
请实现两个函数，分别用来序列化和反序列化二叉树二叉树的序列化是指：把一棵二叉树按照某种遍历方式的结果以某种格式保存为字符串，从而使得内存中建立起来的二叉树可以持久保存。序列化可以基于先序、中序、后序、层序的二叉树遍历方式来进行修改，序列化的结果是一个字符串，序列化时通过 某种符号表示空节点（#），以 ！ 表示一个结点的结束（value!）。二叉树的反序列化是指：根据某种遍历顺序得到的序列化字符串结果str，重构二叉树。
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 先序
function Serialize(pRoot) {
    // write code here
    if (pRoot === null) {
        return '#!'
    }
    let left = Serialize(pRoot.left)
    let right = Serialize(pRoot.right)
    return pRoot.val + '!' + left + right
}
function Deserialize(s) {
    // write code here
    if (s.length === 0) {
        return new TreeNode(null)
    }
    let sourceArr = s.split('!'),
        index = 0
    function process(arr) {
        if (arr[index] === '#') {
            index++
            return null
        }
        let head = new TreeNode(arr[index++])
        head.left = process(arr)
        head.right = process(arr)
        return head
    }
    return process(sourceArr)
}

// 中序
function Serialize(pRoot) {
    // write code here
    if (pRoot === null) {
        return '#!'
    }
    let left = Serialize(pRoot.left)
    let right = Serialize(pRoot.right)
    return left + pRoot.val + '!' + right
}
```
## 63-二叉搜索树的第K个节点.js
给定一棵二叉搜索树，请找出其中的第k小的结点。例如,（5，3，7，2，4，6，8）中，按结点数值大小顺序第三小结点的值为4。
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function KthNode(pRoot, k) {
    // write code here
    if (pRoot === null || k <= 0) {
        return null
    }
    let res = []
    function process(pRoot, res) {
        if (pRoot === null) {
            return
        }
        process(pRoot.left, res)
        res.push(pRoot)
        process(pRoot.right, res)
    }
    process(pRoot, res)
    return k <= res.length ? res[k - 1] : null
}
```
## 64-数据流中的中位数.js
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。
```javascript
const minHeap = new MinHeap()
const maxHeap = new MaxHeap()
let number = 0

function Insert(num) {
    if (number % 2 === 0) {
        minHeap.offer(num)
        let min = minHeap.poll()
        maxHeap.offer(min)
    } else {
        maxHeap.offer(num)
        let max = maxHeap.poll()
        minHeap.offer(max)
    }
    number++
}
function GetMedian() {
    // write code here
    if (number % 2 === 0) {
        return +((minHeap.getRoot() + maxHeap.getRoot()) / 2).toFixed(1)
    } else {
        return maxHeap.getRoot()
    }
}

function MinHeap() {
    this.heap = []
}

MinHeap.prototype.offer = function (num) {
    const heap = this.heap
    heap.push(num)
    let index = heap.length - 1,
        parent = Math.floor((index - 1) / 2),
        parentValue,
        curValue
    while (parent >= 0) {
        curValue = heap[index]
        parentValue = heap[parent]
        if (parentValue > curValue) {
            swap(heap, index, parent)
        } else {
            break
        }
        index = parent
        parent = Math.floor((parent - 1) / 2)
    }
}
MinHeap.prototype.getHeap = function () {
    return this.heap
}
MinHeap.prototype.poll = function () {
    const heap = this.heap
    swap(heap, 0, heap.length - 1)
    let pollValue = heap.pop()
    let curIndex = 0,
        size = heap.length - 1,
        leftIndex = curIndex * 2 + 1,
        rightIndex = curIndex * 2 + 2,
        realIndex
    while (leftIndex <= size) {
        realIndex = rightIndex <= size ? heap[leftIndex] < heap[rightIndex] ? leftIndex : rightIndex : leftIndex
        if (heap[curIndex] > heap[realIndex]) {
            swap(heap, curIndex, realIndex)
        }
        curIndex = realIndex
        leftIndex = curIndex * 2 + 1
        rightIndex = curIndex * 2 + 2
    }
    return pollValue
}
MinHeap.prototype.getRoot = function () {
    return this.heap[0]
}

function MaxHeap() {
    this.heap = []
}

MaxHeap.prototype.offer = function (num) {
    const heap = this.heap
    heap.push(num)
    let index = heap.length - 1,
        parent = Math.floor((index - 1) / 2),
        parentValue,
        curValue
    while (parent >= 0) {
        curValue = heap[index]
        parentValue = heap[parent]
        if (parentValue < curValue) {
            swap(heap, index, parent)
        } else {
            break
        }
        index = parent
        parent = Math.floor((parent - 1) / 2)
    }
}
MaxHeap.prototype.getHeap = function () {
    return this.heap
}
MaxHeap.prototype.poll = function () {
    const heap = this.heap
    swap(heap, 0, heap.length - 1)
    let pollValue = heap.pop()
    let curIndex = 0,
        size = heap.length - 1,
        leftIndex = curIndex * 2 + 1,
        rightIndex = curIndex * 2 + 2,
        realIndex
    while (leftIndex <= size) {
        realIndex = rightIndex <= size ? heap[leftIndex] > heap[rightIndex] ? leftIndex : rightIndex : leftIndex
        if (heap[curIndex] < heap[realIndex]) {
            swap(heap, curIndex, realIndex)
        }
        curIndex = realIndex
        leftIndex = curIndex * 2 + 1
        rightIndex = curIndex * 2 + 2
    }
    return pollValue
}

MaxHeap.prototype.getRoot = function () {
    return this.heap[0]
}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
```
## 65-滑动窗口的最大值.js
给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}；针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。
```javascript
function maxInWindows(num, size) {
    // write code here
    if (num.length < size || size < 1) {
        return
    }
    let queue = [],
        L = 0,
        R = -1,
        res = []
    for (let i = 0; i < num.length; i++) {
        while (R >= L && num[i] >= num[queue[R]]) {
            R--
        }
        queue[++R] = i
        if (i - size === queue[L]) {
            L++
        }
        if (i - size + 1 >= 0) {
            res.push(num[queue[L]])
        }
    }
    return res
}
```
## 66-矩阵中的路径.js
请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。例如 a b c e s f c s a d e e 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。
```javascript
function hasPath(matrix, rows, cols, path) {
    // write code here
    let matrixArr = [], t = 0
    while (t < rows) {
        matrixArr[t] = []
        let start = t * cols
        for (let i = start; i < start + cols; i++) {
            matrixArr[t].push(matrix[i])
        }
        t++
    }
    let book = []
    for (let i = 0; i < rows; i++) {
        book[i] = new Array(cols).fill(true)
    }
    let flag = false
    let direction = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (flag) {
                break
            }
            flag = dfs(i, j, 0, path, '')
        }
    }
    function dfs(x, y, step, path, str) {
        if (x < 0 || y < 0 || x >= rows || y >= cols) {
            return step - 1 === path.length - 1
        }
        if (!book[x][y]) {
            return false
        }
        if (matrixArr[x][y] === path[step] && step === path.length - 1) {
            return true
        }
        if (matrixArr[x][y] !== path[step]) {
            return false
        }
        let res = false
        for (let i = 0; i < direction.length; i++) {
            book[x][y] = false
            res = res || dfs(x + direction[i][0], y + direction[i][1], step + 1, path, str + matrixArr[x][y])
            book[x][y] = true
        }
        return res
    }
    return flag
}
```
## 67-机器人的运动范围.js
地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？
```javascript
function movingCount(threshold, rows, cols) {
    // write code here
    let direction = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    let book = [], res = 0
    for (let i = 0; i < rows; i++) {
        book[i] = new Array(cols).fill(true)
    }
    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= rows || y >= cols) {
            return
        }
        if (!book[x][y]) {
            return
        }
        if (getEachNumber(x) + getEachNumber(y) > threshold) {
            return
        }
        res++
        for (let i = 0; i < direction.length; i++) {
            book[x][y] = false
            dfs(x + direction[i][0], y + direction[i][1])
        }
    }
    dfs(0, 0)
    return res
}

function getEachNumber(num) {
    let res = 0
    while ((num / 10).toFixed(1) > 0) {
        res += num % 10
        num = Math.floor(num / 10)
    }
    return res
}
```
## 68-剪绳子.js
给你一根长度为n的绳子，请把绳子剪成m段（m、n都是整数，n>1并且m>1），每段绳子的长度记为k[0],k[1],...,k[m]。请问k[0]xk[1]x...xk[m]可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
```javascript
/**
 * 题目分析：
 * 先举几个例子，可以看出规律来。
 * 4 ： 2*2
 * 5 ： 2*3
 * 6 ： 3*3
 * 7 ： 2*2*3 或者4*3
 * 8 ： 2*3*3
 * 9 ： 3*3*3
 * 10：2*2*3*3 或者4*3*3
 * 11：2*3*3*3
 * 12：3*3*3*3
 * 13：2*2*3*3*3 或者4*3*3*3
 * 所以只可能是 2 和 3, 所有的长度都可以用 2 和 3 组合起来
 *
 * 乘方运算的复杂度为：O(log n)，用动态规划来做会耗时比较多。
 */
function cutRope(number) {
    // write code here
    if (number <= 2) {
        return 1
    }
    if (number === 3) {
        return 2
    }
    let x = Math.floor(number / 3)
    let y = number % 3
    if (y === 0) {
        return Math.pow(3, x)
    } else if (y === 1) {
        return 2 * 2 * Math.pow(3, x - 1)
    } else {
        return 2 * Math.pow(3, x)
    }
}
```