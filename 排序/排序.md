# 排序
## 二分查找.js
```javascript
function binarySearch(arr, aim) {
    let left = 0,
        right = arr.length - 1,
        middle = Math.floor((left + right) / 2)
    while (left <= right) {
        if (arr[middle] < aim) {
            left = middle + 1
        } else if (arr[middle] > aim) {
            right = middle - 1
        } else {
            return middle
        }
        middle = Math.floor((left + right) / 2)
    }
}
```
## 冒泡.js
时间复杂度为O(N^2)，可以做到稳定
```javascript
/**
 * 
 * @param {*} arr 
 * 循环length次，每次都和后面比较交换，每一趟比较的序列的长度都会减一
 */
function bubbleSort(arr) {
    var temp = undefined,
        arr = arr.concat([])
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
```
## 堆.js
建立堆，时间复杂度为 O(N)，做不到稳定
```javascript
/**
 * 堆分为大根堆和小根堆，排序的思路是从将形成后的堆的头部和尾部交换，然后大小减一，不断重复前面交换的过程，直到堆的大小为1
 * 大堆: ①根的值大于左右子树的值   ②子树也是最大堆
 * 小堆: ①根的值小于左右子树的值   ②子树也是最小堆s
 */
/**
 * 从尾部插入节点
 * @param {*} arr 原数组
 * @param {*} index 待插入的节点
 */
function heapInsert(arr, index) {
    if(index === 0) return
    while(arr[index] > arr[Math.floor((index - 1) / 2)]) {
        swap(arr, index, Math.floor((index - 1) / 2))
        index = Math.floor((index - 1) / 2)
        if(index === 0) break
    }
}

/**
 * 从顶部往下沉
 * @param {*} arr 原数组
 * @param {*} index 顶部的位置
 * @param {*} headSize 目前已经形成的堆的大小
 */
function heapify(arr, index, headSize) {
    let left = index * 2 + 1
    while(left < headSize) {
        let largest = (left + 1 < headSize) && (arr[left] < arr[left + 1]) ? left + 1 : left
        largest = arr[index] > arr[largest] ? index : largest
        if(largest === index) break
        swap(arr, index, largest)
        index = largest
        left = largest * 2 + 1
    }
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}

function heapSort(arr) {
    for (let index = 0; index < arr.length; index++) {
        heapInsert(arr, index)
    }
    let headSize = arr.length
    swap(arr, 0, --headSize)
    while(headSize > 0) {
        heapify(arr, 0, headSize)
        swap(arr, 0, --headSize)
    }
}

var arr = [6, 5, 4, 2, 1].reverse()
heapSort(arr)
```
## 归并排序.js
```javascript
/**
 * @param {原数组} arr
 * @param {左边界} left
 * @param {右边界} right
 * 将数组分成两部分，左边的排好序，右边的排好序，每次都通过定义两个指针的外排形式，将左右两边排好序的数组进行合并，并将合并后的有序数组覆盖到原数组的指定位置
 */

 // 时间复杂度根据 master 公式得到 O(NlongN) 可以做到稳定
function merge(arr, left, right) {
    if(left === right) return
    let middle = Math.floor((left + right) / 2)
    merge(arr, left, middle)
    merge(arr, middle + 1, right)
    outerSort(arr, left, right)
}

function outerSort(arr, left, right) {
    let middle = Math.floor((left + right) / 2)
    let l = left,
        r = middle + 1,
        newArr = [];
    while(l <= middle && r <= right) {
        if(arr[l] >= arr[r]) {
            newArr.push(arr[r++])
        } else {
            newArr.push(arr[l++])
        }
    }
    while(r <= right) {
        newArr.push(arr[r++])
    }
    while(l <= middle) {
        newArr.push(arr[l++])
    }
    for(let i = left, j = 0; i <= right; i++, j++) {
        arr[i] = newArr[j]
    }
}

var arr = [1, 5, 3, 10, 3, 5, 3, 2]
merge(arr, 0, arr.length - 1)


// 归并排序的应用：小和问题和逆序对问题

// 小和问题: 在一个数组中，每一个数左边比当前数小的和相互加起来
function mergeSort(arr, l, r) {
    if(l === r) return
    let middle = (l + (r - l) >> 1)
    return mergeSort(arr, l, middle) +
            mergeSort(arr, middle + 1, r) +
            merge(arr, l, r)
}

function merge(arr, l, r) {
    let middle = (l + (r - l) >> 1)
    let p1 = l,
        p2 = middle + 1,
        newArr = [],
        result = 0;
    while(p1 <= middle && p2 <= r) {
        if(arr[p1] >= arr[p2]) {
            newArr.push(arr[p2++])
        } else {
            newArr.push(arr[p1])
            result += arr[p1] * (r - p2 + 1)
            p1++
        }
    }
    while(p1 <= middle) {
        newArr.push(arr[p1++])
    }
    while(p2 <= r) {
        newArr.push(arr[p2++])
    }
    for(let i = l, j =0; i <= r; i ++, j++) {
        arr[i] = newArr[j]
    }
    return result
}
```
## 快速排序.js
```javascript
/**
 * 
 * @param {*} arr 
 * @param {*} left 
 * @param {*} right 
 * 经典快拍，最差情况为O(n^2),应使用随机快排
 * 找基准数，是左边全部小于它，右边全部大于他，每次右指针先动，然后左边指针动
 */

// 时间复杂度根据 master 公式为 N(longN)
function quickSort(arr, left, right) {
    let i, j, flag
    if (left > right) {
        return
    }
    let radom = left + Math.floor(Math.random() * (right - left + 1))
    swap(arr, left, radom)
    flag = arr[left]
    i = left
    j = right
    while(i != j) {
        while(arr[j] >= flag && i < j) {
            j--
        }

        while(arr[i] <= flag && i < j) {
            i++
        }

        if (i < j) {
            swap(arr, i, j)
        }
    }
    arr[left] = arr[i]
    arr[i] = flag
    quickSort(arr, left, i - 1)
    quickSort(arr, i + 1, right)
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}
var arr = [423,5435, 45, 666, 1, 10, 10, 10, 5, 5, 0, -1]

quickSort(arr, 0, arr.length - 1)
console.log(arr)

// 使用 荷兰国旗问题来改进经典快排, 排序时中间相等的序列不需要再分，同时加入随机标志位

function quickSort(arr, left, right) {
    if(left > right) return
    let result = partition(arr, left, right)
    quickSort(arr, left, result.right)
    quickSort(arr, result.left, right)
}

function partition(arr, l, r) {
    let less = l - 1,
        more = r + 1,
        cur = l;
    let radom = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, r, radom)
    let flag = arr[r];
    while(cur < more) {
        if(arr[cur] < flag) {
            swap(arr, ++less, cur++)
        } else if(arr[cur] > flag) {
            swap(arr, cur, --more)
        } else {
            cur++
        }
    }
    return {
        right: less,
        left: more
    }
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}
```
## 插入排序.js
```javascript
/**
 * 
 * @param {*} arr 
 * 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 * 插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，
 * 需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。
 */

//  时间复杂度为O(N^2) 可以做到稳定
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]
        let j = i - 1
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
    return arr
}


```
## 荷兰国旗问题.js
```javascript
/**
 *
 * @param {原数组} arr
 * @param {给定的值} num
 * 给定一个值，要求数组左边的值全部小于 num ，数组右边的值全部大于 num ,中间的值全部等于 num
 * 定义三个区域
 */

// 时间复杂度为O(N) 做不到稳定
function partition(arr, num) {
    let less = -1,
        more = arr.length,
        cur = 0;
    while(cur < more) {
        if(arr[cur] < num) {
            // less 区域扩大
            swap(arr, ++less, cur++)
        } else if(arr[cur] > num) {
            // more 区域扩大
            swap(arr, --more, cur)
        } else {
            // 相等 cur 增加
            cur++
        }
    }
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}

var arr = [423,5435, 45, 666, 1, 10, 10, 10, 5, 5, 0, -1]
partition(arr, 10)
```
## 选择排序.js
```javascript
/**
 * 
 * @param {*} arr 
 * 选择排序(Selection-sort)是一种简单直观的排序算法。
 * 它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后。
 * 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
 */
// 时间复杂度为 O(N^2) 无法做到稳定
function selectionSort(arr) {
    var temp = undefined,
        arr = [].concat(arr)
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}
```
## 非比较排序.js
求一个数组排序之后相邻位置差的最大值，不能用比较排序
> 思路：使用桶排序，如果有N个数，那么就准备N+1个桶，先遍历一遍，求得最大值和最小值，然后将最大值和最小值之间的范围分为10等分，每个桶分别维护当前的最大值和最小值，多出来一个空桶是为了保证最大差值不在桶内，而是响铃桶之间
```javascript
function maxDiffer(arr) {
    let minValue = Number.MAX_VALUE,
        maxValue = Number.MIN_VALUE,
        len = arr.length;
    if(minValue === maxValue) return 0
    arr.forEach(value => { // 求出最大最小值
        maxValue = value > maxValue ? value : maxValue
        minValue = value < minValue ? value : minValue
    });
    let boolbucket = new Array(len + 1).fill(false),
        maxbucket = new Array(len + 1).fill(Number.MIN_VALUE),
        minbucket = new Array(len + 1).fill(Number.MAX_VALUE);
    maxbucket[0] = minValue
    maxbucket[len] = maxValue
    minbucket[0] = minValue
    minbucket[len] = maxValue
    boolbucket[0] = true
    boolbucket[len] = true
    arr.forEach(value => {
        if(value === minValue || value === maxValue) {
            return
        }
        let index = judge(value, len, minValue, maxValue) - 1
        if(value > maxbucket[index]) {
            maxbucket[index] = value
        }
        if (value < minbucket[index]) {
            minbucket[index] = value
        }
        boolbucket[index] = true
    })
    let maxdiffer = 0
    for(let i = 0; i < len; ) { // 从0到第N个桶 计算最大差值
        let cur = i,
            next = i + 1
        if(!boolbucket[next]) { // 如果下一个桶为空，那么继续往下找
            while(!boolbucket[next]) {
                next++
            }
        }
        if(minbucket[next] - maxbucket[cur] > maxdiffer) {
            maxdiffer = minbucket[next] - maxbucket[cur]
        }
        cur = i = next
        next += 1
    }
    return maxdiffer
}
// 负责计算当前值归属于哪一个桶
function judge(value, len, minValue, maxValue) {
    let average = Math.floor((maxValue - minValue) / (len + 1)),
        temp = value - minValue + 1;
    return temp % average === 0 ? temp / average : Math.floor(temp / average) + 1
}

var arr = [1, 10, 20, 100, 80, 30, 55, 22, 70]

console.log(maxDiffer(arr))
```
