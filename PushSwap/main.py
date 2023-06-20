import size3, size5, morethan_5, sys, for100, random


def get_indexed_a(stack_a):
        
    index_a = list(range(1, len(stack_a) + 1))
    stack_len= len(stack_a)
    
    for index, value in enumerate(stack_a):
        pos = 0
        for v in stack_a:
            if v > value:
                pos += 1
        final_pos = stack_len - pos
        index_a[index] = final_pos 
    return (index_a)

def get_stack_a(file):
    
    #should first use merge sort? to order the OG array. Then use BTree to get index for each value. It's a bit faster than checking the full array updating the POS 
    stack_a = list()

    
    text_file = open(file, "r")
    
    for line in text_file:
        line = line.strip('\n')
        stack_a.append(int(line))
        
    index_a = get_indexed_a(stack_a)

    return (index_a)

def print_logic(movements):
    for idx, move in enumerate(movements):
        #if (move == "sa" and movements[idx + 1] == "sb") or (move =="sb" and movements[idx + 1] == "sa"):
           # print("double")
        if move == "pb" or move == "pa":
            continue
        else:
            j = idx + 1
            char = move[-1]
            if char == "b":
                pair = move.replace("b", "a")
            else:
                pair = move.replace("a", "b")
            while (j < len(movements)):
                if movements[j][-1] == char or movements[j][0] == "p":
                    break
                    
                else:
                    if movements[j] == pair:
                        new = list(movements[j])
                        new[-1] = new[0]
                        new = "".join(new)
                        movements.pop(idx)
                        movements.pop(j - 1)
                        movements.insert(j - 1, new)
                        
                        break
                j += 1


def randomGen(n):
    
    newList = random.sample(range(n), n)
    
    return newList
        
    
                    


def main():
    values= []
    maxScore = 0
    maxList = list()
    failedSorts = list()
    
    if sys.argv[1] == "random" or sys.argv[1] == "r":
        max_count = 1
        max_500 = 1
        minStac = list()
        for argument in range(int(sys.argv[2])):
            space = 2
            numDiv = 0
            movements = list()
            stack_a = randomGen(int(sys.argv[3]))

            stack_a = get_indexed_a(stack_a)
            copy_a = stack_a.copy()
            if len(stack_a) == 5:
                stack_a = size5.solve_for_5(stack_a, movements)
                if not sorted(stack_a):
                    failedSorts.append(copy_a)
                else:
                    values.append(len(movements))
                if len(movements) > 12:
                    if copy_a not in maxList:
                        maxList.append(copy_a)
            else:

                stack_a = for100.solve_for_100(stack_a,movements, space, numDiv)
                print_logic(movements)
                minLen = len(movements)
                minMovements = movements.copy()
                while space < 4:
                    space += 1
                    movements = list()
                    stack_a = copy_a.copy()
                    stack_a = for100.solve_for_100(stack_a, movements, space, numDiv)
                    print_logic(movements)
                    if len(movements) < minLen:
                        minLen = len(movements)
                        minMovements = movements.copy()
                    if (sorted(stack_a) != stack_a):
                        print (f"List number {argument} not sorted sorted")
                        failedSorts.append(copy_a)
                values.append(minLen)
                if len(movements) >= 700 and len(stack_a) == 100:
                    path = r'/home/luised2094/pushswap/savedfiles/maxList_' + str(max_count)
                    with open(path, 'w') as fp:
                        for num in copy_a:
                            fp.write("%i\n" % num)
                    max_count += 1
                elif len(movements) >= 5500 and len(stack_a) == 500:
                    path = r'/home/luised2094/pushswap/savedfiles/maxList500_' + str(max_500)
                    with open(path, 'w') as fp:
                        for num in copy_a:
                            fp.write("%i\n" % num)
                    max_count += 1
            

                if maxList:
                    path = r'/home/luised2094/pushswap/savedfiles/maxList'
                    with open(path, 'w') as fp:
                        for num in maxList:
                            fp.write("%i\n" % num)
                if failedSorts:
                    path = r'/home/luised2094/pushswap/savedfiles/failed_sort'
                    with open(path, 'w') as fp:
                        for lists in failedSorts:
                            for num in lists:
                                fp.write("%i\n" % num)
                            fp.write("Next List: \n")
                    
        avr = sum(values) / len(values)
        if (failedSorts):
            print(failedSorts)
        if (maxList):
            print(maxList)
        print ('average  ' + str(avr))
        print ('max ' + str(max(values)))
        print ('min ' + str(min(values)))
    
    elif sys.argv[1] == "p":
        for index, argument in enumerate(sys.argv):
            space = 2
            numDiv = 0
            if index  < 2:
                continue
            stack_a = get_stack_a(argument)
            copy_a = stack_a.copy()
            sorted_a = sorted(stack_a)
            movements = list()
            if len(stack_a) == 3:
                stack_a = size3.solve_for_3(stack_a, movements)
            elif len(stack_a) == 5:
                stack_a = size5.solve_for_5(stack_a, movements)
            elif len(stack_a)>= 100:
                stack_a = for100.solve_for_100(stack_a,movements, space, numDiv)
                print_logic(movements)
                minLen = len(movements)
                minMovements = movements.copy()
                while space < 4:
                    space += 1
                    movements = list()
                    stack_a = copy_a.copy()
                    stack_a = for100.solve_for_100(stack_a, movements, space, numDiv)
                    print_logic(movements)
                    if len(movements) < minLen:
                        minLen = len(movements)
                        minMovements = movements.copy()
    else:
        for index, argument in enumerate(sys.argv):
            space = 2
            numDiv = 0
            if index == 0:
                continue
            stack_a = get_stack_a(argument)
            copy_a = stack_a.copy()
            sorted_a = sorted(stack_a)
            movements = list()
            if len(stack_a) == 3:
                stack_a = size3.solve_for_3(stack_a, movements)
            elif len(stack_a) == 5:
                stack_a = size5.solve_for_5(stack_a, movements)
            elif len(stack_a)>= 100:
                #print(", ".join(['"{}"'.format(str(x)) for x in stack_a]))
                stack_a = for100.solve_for_100(stack_a,movements, space, numDiv)
                print_logic(movements)
                print(len(movements))
                print(*movements, sep="\n")

                minLen = len(movements)
                minMovements = movements.copy()
                while space < 5:
                    space += 1
                    numDiv = 0
                    while numDiv < 5:
                        numDiv +=  1
                        movements = list()
                        stack_a = copy_a.copy()
                        stack_a = for100.solve_for_100(stack_a, movements, space, numDiv)
                        print_logic(movements)
                        if len(movements) < minLen:
                            minLen = len(movements)
                            minMovements = movements.copy()
            else:
                stack_a = morethan_5.more_than5(stack_a, movements)
            #if (sorted_a == stack_a):
             #   print (f"Is sorted with {len(minMovements)}")
            #else:
             #   print ("nOt sorted")
            #values.append(len(minMovements))
            
       # avr = sum(values) / len(values)
       # print ('average  ' + str(avr))
        #print ("max " + str(max(values)))
        #print ("min " + str(min(values)))
        print(stack_a)
        print(len(minMovements))



    

if __name__ == "__main__":
    main()